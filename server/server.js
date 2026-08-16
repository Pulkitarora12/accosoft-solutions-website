import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb, openDb } from './database.js';

dotenv.config();

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const auditLogPath = path.join(__dirname, 'audit.log');

// SMTP transporter (shared across all outbound mail)
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const notificationEmail = process.env.NOTIFICATION_EMAIL || smtpUser;

let transporter = null;
if (smtpHost && smtpUser && smtpPass) {
  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort) || 587,
    secure: parseInt(smtpPort) === 465, // true for port 465 (SSL), false for port 587 (STARTTLS)
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });
} else {
  console.log('SMTP config not provided in .env. Outbound emails will be logged to console only.');
}

// Generic mail sender used by all form endpoints
async function sendMail({ subject, text, html, replyTo }) {
  console.log('--- EMAIL NOTIFICATION ---');
  console.log(subject);
  console.log(text);
  console.log('--------------------------');

  if (!transporter) {
    console.log('Skipping real email transmission (SMTP not configured).');
    return;
  }

  await transporter.sendMail({
    from: `"Accosoft Solutions Website" <${smtpUser}>`,
    to: notificationEmail,
    replyTo,
    subject,
    text,
    html
  });

  console.log(`Email sent successfully: ${subject}`);
}

// Apply security headers
app.use(helmet());

// HTTPS Enforcement Middleware
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    const isSecure = req.secure || req.headers['x-forwarded-proto'] === 'https';
    if (!isSecure) {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
  }
  next();
});

const allowedOrigins = [
  'https://accosoftsolutions.com',
  'https://www.accosoftsolutions.com',
  'https://main.accosoftsolutions.com',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Rate Limiters
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per 15 minutes
  message: { error: 'Too many login attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

const leadsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per 15 minutes
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(express.json());

// Initialize SQLite database
let db;
try {
  db = await initDb();
} catch (err) {
  console.error('Failed to initialize database:', err);
  process.exit(1);
}

// Simple Token-based Auth system
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_TOKENS = new Map();

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Periodic cleanup of expired tokens (every 30 minutes)
setInterval(() => {
  const now = Date.now();
  const twoHours = 2 * 60 * 60 * 1000;
  for (const [token, session] of SESSION_TOKENS.entries()) {
    if (now - session.createdAt > twoHours) {
      SESSION_TOKENS.delete(token);
    }
  }
}, 30 * 60 * 1000);

// Audit logging helper
function logAudit(req, endpoint, status, details = '') {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] IP: ${ip} | Endpoint: ${endpoint} | Status: ${status ? 'SUCCESS' : 'FAILURE'} | Details: ${details}\n`;

  console.log(logLine.trim());
  fs.appendFile(auditLogPath, logLine, (err) => {
    if (err) {
      console.error('Failed to write to audit log:', err);
    }
  });
}

// HTML escaping helper
function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') {
    if (unsafe === null || unsafe === undefined) return '';
    return escapeHtml(String(unsafe));
  }
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Auth middleware
function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logAudit(req, '/api/leads', false, 'Access denied. No token provided.');
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  const token = authHeader.split(' ')[1];
  const session = SESSION_TOKENS.get(token);
  if (!session) {
    logAudit(req, '/api/leads', false, 'Invalid session token.');
    return res.status(403).json({ error: 'Invalid or expired session token.' });
  }

  // Expiry check: 2 hours
  const twoHours = 2 * 60 * 60 * 1000;
  if (Date.now() - session.createdAt > twoHours) {
    SESSION_TOKENS.delete(token); // clean up expired token
    logAudit(req, '/api/leads', false, 'Expired session token.');
    return res.status(403).json({ error: 'Invalid or expired session token.' });
  }

  next();
}

// 1. Submit Lead Endpoint
app.post('/api/leads', leadsLimiter, async (req, res) => {
  const { name, email, phone, message, sessionId, searchHistory, pageHistory, timestamp } = req.body;

  if (!name || !email || !phone || !sessionId) {
    return res.status(400).json({ error: 'Missing required lead parameters.' });
  }

  try {
    // A. Insert Lead (ignore duplicates if session already submitted)
    const leadResult = await db.run(
      `INSERT OR IGNORE INTO leads (name, email, phone, message, session_id, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, phone, message || null, sessionId, timestamp]
    );

    // B. Insert Activities
    // Page History
    if (pageHistory && pageHistory.length > 0) {
      for (const page of pageHistory) {
        await db.run(
          `INSERT INTO activities (session_id, type, path, duration, query, timestamp)
           VALUES (?, 'page', ?, ?, NULL, ?)`,
          [sessionId, page.path, page.duration, page.enteredAt]
        );
      }
    }

    // Search History
    if (searchHistory && searchHistory.length > 0) {
      for (const search of searchHistory) {
        await db.run(
          `INSERT INTO activities (session_id, type, path, duration, query, timestamp)
           VALUES (?, 'search', ?, NULL, ?, ?)`,
          [sessionId, search.path, search.query, search.timestamp]
        );
      }
    }

    // C. Send Admin Notification Email
    sendLeadNotification(req.body);

    res.status(201).json({ success: true, message: 'Lead captured successfully.' });
  } catch (err) {
    console.error('Error inserting lead data:', err);
    res.status(500).json({ error: 'Internal server error while storing lead.' });
  }
});

// 2. Admin Login Endpoint
app.post('/api/admin/login', loginLimiter, (req, res) => {
  const { password } = req.body;
  if (!password) {
    logAudit(req, '/api/admin/login', false, 'Password required');
    return res.status(400).json({ error: 'Password required' });
  }

  if (password === ADMIN_PASSWORD) {
    const token = generateToken();
    SESSION_TOKENS.set(token, { createdAt: Date.now() });
    logAudit(req, '/api/admin/login', true);
    res.json({ success: true, token });
  } else {
    logAudit(req, '/api/admin/login', false, 'Incorrect credentials');
    res.status(401).json({ error: 'Incorrect credentials' });
  }
});

// 3. Get Leads Endpoint (Secure)
app.get('/api/leads', authenticateAdmin, async (req, res) => {
  logAudit(req, '/api/leads', true);
  try {
    // Fetch all leads
    const leads = await db.all('SELECT * FROM leads ORDER BY id DESC');

    // Fetch activities for each lead
    const leadsWithHistory = [];
    for (const lead of leads) {
      const activities = await db.all(
        'SELECT * FROM activities WHERE session_id = ? ORDER BY id ASC',
        [lead.session_id]
      );

      const pageHistory = activities
        .filter((act) => act.type === 'page')
        .map((act) => ({
          path: act.path,
          enteredAt: act.timestamp,
          duration: act.duration
        }));

      const searchHistory = activities
        .filter((act) => act.type === 'search')
        .map((act) => ({
          path: act.path,
          query: act.query,
          timestamp: act.timestamp
        }));

      leadsWithHistory.push({
        ...lead,
        pageHistory,
        searchHistory
      });
    }

    res.json(leadsWithHistory);
  } catch (err) {
    console.error('Error fetching leads:', err);
    res.status(500).json({ error: 'Failed to retrieve leads.' });
  }
});

// Email Notification Function
async function sendLeadNotification(lead) {
  const summary = `
    New Business Lead Captured:
    --------------------------------
    Name: ${lead.name}
    Email: ${lead.email}
    Phone: ${lead.phone}
    Looking For: ${lead.message || 'Not Specified'}
    Session ID: ${lead.sessionId}
    Time: ${new Date(lead.timestamp).toLocaleString()}

    Visitor Journey Summary:
    --------------------------------
    - Pages Visited: ${lead.pageHistory ? lead.pageHistory.length : 0}
    - Searches Performed: ${lead.searchHistory ? lead.searchHistory.length : 0}
  `;

  try {
    const pageLogs = lead.pageHistory
      ? lead.pageHistory.map(p => `<li><code>${escapeHtml(p.path)}</code> (${p.duration ? escapeHtml(String(p.duration)) + 's' : 'Active'})</li>`).join('')
      : 'None';

    const searchLogs = lead.searchHistory
      ? lead.searchHistory.map(s => `<li>Query: <strong>"${escapeHtml(s.query)}"</strong> on <code>${escapeHtml(s.path)}</code></li>`).join('')
      : 'None';

    const escapedName = escapeHtml(lead.name);
    const escapedEmail = escapeHtml(lead.email);
    const escapedPhone = escapeHtml(lead.phone);
    const escapedMessage = escapeHtml(lead.message || 'Not Specified');
    const escapedTimestamp = escapeHtml(new Date(lead.timestamp).toLocaleString());
    const escapedSessionId = escapeHtml(lead.sessionId);

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-top: 4px solid #f5821f; border-radius: 6px; padding: 20px;">
        <h2 style="color: #0b2f52; margin-top: 0;">🔥 New Business Lead Captured</h2>
        <p>A new consultation diagnostic roadmap request was submitted via the website popup.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f9f9f9;"><td style="padding: 8px; font-weight: bold; width: 120px;">Name:</td><td style="padding: 8px;">${escapedName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${escapedEmail}">${escapedEmail}</a></td></tr>
          <tr style="background-color: #f9f9f9;"><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${escapedPhone}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Inquiry:</td><td style="padding: 8px; font-style: italic;">${escapedMessage}</td></tr>
          <tr style="background-color: #f9f9f9;"><td style="padding: 8px; font-weight: bold;">Submitted At:</td><td style="padding: 8px;">${escapedTimestamp}</td></tr>
        </table>

        <h3 style="color: #0b2f52; border-bottom: 1px solid #ddd; padding-bottom: 6px;">🧭 Pre-Submission Visitor Journey</h3>
        
        <h4 style="margin: 10px 0 5px 0;">Pages Visited:</h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 0.9em; line-height: 1.4;">${pageLogs}</ul>

        <h4 style="margin: 10px 0 5px 0;">Searches Made:</h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 0.9em; line-height: 1.4;">${searchLogs}</ul>

        <div style="margin-top: 30px; border-top: 1px dotted #ddd; padding-top: 15px; font-size: 0.8em; text-align: center; color: #777;">
          System Session ID: <code>${escapedSessionId}</code> | Accosoft Solutions Leads Manager
        </div>
      </div>
    `;

    await sendMail({
      subject: `[New Lead] ${lead.name} - Roadmap Inquiry`,
      text: summary,
      html: htmlContent,
      replyTo: lead.email
    });
  } catch (err) {
    console.error('Failed to transmit lead notification email:', err);
  }
}

// 4. Consultation Request Endpoint (Request Service page)
app.post('/api/contact', leadsLimiter, async (req, res) => {
  const { fullName, company, email, phone, service, message, preference } = req.body;

  if (!fullName || !email || !phone || !service || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const escapedName = escapeHtml(fullName);
  const escapedCompany = escapeHtml(company || 'Not Specified');
  const escapedEmail = escapeHtml(email);
  const escapedPhone = escapeHtml(phone);
  const escapedService = escapeHtml(service);
  const escapedMessage = escapeHtml(message);
  const escapedPreference = escapeHtml(preference || 'email');

  const text = `New Consultation Request\n--------------------------------\nName: ${fullName}\nCompany: ${company || 'Not Specified'}\nEmail: ${email}\nPhone: ${phone}\nService Requested: ${service}\nPreferred Contact: ${preference || 'email'}\n\nMessage:\n${message}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-top: 4px solid #f5821f; border-radius: 6px; padding: 20px;">
      <h2 style="color: #0b2f52; margin-top: 0;">📋 New Consultation Request</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f9f9f9;"><td style="padding: 8px; font-weight: bold; width: 140px;">Name:</td><td style="padding: 8px;">${escapedName}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${escapedCompany}</td></tr>
        <tr style="background-color: #f9f9f9;"><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${escapedEmail}">${escapedEmail}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${escapedPhone}</td></tr>
        <tr style="background-color: #f9f9f9;"><td style="padding: 8px; font-weight: bold;">Service Requested:</td><td style="padding: 8px;">${escapedService}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Preferred Contact:</td><td style="padding: 8px;">${escapedPreference}</td></tr>
      </table>
      <h4 style="color: #0b2f52; border-bottom: 1px solid #ddd; padding-bottom: 6px;">Message:</h4>
      <p style="white-space: pre-wrap;">${escapedMessage}</p>
    </div>
  `;

  try {
    await sendMail({
      subject: `[Consultation Request] ${fullName} - ${service}`,
      text,
      html,
      replyTo: email
    });
    res.status(201).json({ success: true, message: 'Enquiry sent successfully.' });
  } catch (err) {
    console.error('Error sending contact enquiry email:', err);
    res.status(500).json({ error: 'Failed to send enquiry.' });
  }
});

// 5. Job Application Endpoint (Careers page)
app.post('/api/careers', leadsLimiter, async (req, res) => {
  const { fullName, email, phone, position, coverLetter } = req.body;

  if (!fullName || !email || !phone || !position) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const escapedName = escapeHtml(fullName);
  const escapedEmail = escapeHtml(email);
  const escapedPhone = escapeHtml(phone);
  const escapedPosition = escapeHtml(position);
  const escapedCoverLetter = escapeHtml(coverLetter || 'Not Provided');

  const text = `New Job Application\n--------------------------------\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nPosition: ${position}\n\nCover Letter:\n${coverLetter || 'Not Provided'}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-top: 4px solid #f5821f; border-radius: 6px; padding: 20px;">
      <h2 style="color: #0b2f52; margin-top: 0;">💼 New Job Application</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f9f9f9;"><td style="padding: 8px; font-weight: bold; width: 140px;">Name:</td><td style="padding: 8px;">${escapedName}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${escapedEmail}">${escapedEmail}</a></td></tr>
        <tr style="background-color: #f9f9f9;"><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${escapedPhone}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Position:</td><td style="padding: 8px;">${escapedPosition}</td></tr>
      </table>
      <h4 style="color: #0b2f52; border-bottom: 1px solid #ddd; padding-bottom: 6px;">Cover Letter:</h4>
      <p style="white-space: pre-wrap;">${escapedCoverLetter}</p>
    </div>
  `;

  try {
    await sendMail({
      subject: `[Job Application] ${fullName} - ${position}`,
      text,
      html,
      replyTo: email
    });
    res.status(201).json({ success: true, message: 'Application submitted successfully.' });
  } catch (err) {
    console.error('Error sending job application email:', err);
    res.status(500).json({ error: 'Failed to submit application.' });
  }
});

// 6. Client Review / Testimonial Endpoint (Home page)
app.post('/api/feedback', leadsLimiter, async (req, res) => {
  const { fullName, company, rating, message } = req.body;

  if (!fullName || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const escapedName = escapeHtml(fullName);
  const escapedCompany = escapeHtml(company || 'Not Specified');
  const escapedRating = escapeHtml(rating ? `${rating} / 5` : 'Not Rated');
  const escapedMessage = escapeHtml(message);

  const text = `New Client Review\n--------------------------------\nName: ${fullName}\nCompany: ${company || 'Not Specified'}\nRating: ${rating ? `${rating} / 5` : 'Not Rated'}\n\nReview:\n${message}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-top: 4px solid #f5821f; border-radius: 6px; padding: 20px;">
      <h2 style="color: #0b2f52; margin-top: 0;">⭐ New Client Review</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f9f9f9;"><td style="padding: 8px; font-weight: bold; width: 140px;">Name:</td><td style="padding: 8px;">${escapedName}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${escapedCompany}</td></tr>
        <tr style="background-color: #f9f9f9;"><td style="padding: 8px; font-weight: bold;">Rating:</td><td style="padding: 8px;">${escapedRating}</td></tr>
      </table>
      <h4 style="color: #0b2f52; border-bottom: 1px solid #ddd; padding-bottom: 6px;">Review:</h4>
      <p style="white-space: pre-wrap;">${escapedMessage}</p>
    </div>
  `;

  try {
    await sendMail({
      subject: `[Client Review] ${fullName}`,
      text,
      html
    });
    res.status(201).json({ success: true, message: 'Review submitted successfully.' });
  } catch (err) {
    console.error('Error sending review email:', err);
    res.status(500).json({ error: 'Failed to submit review.' });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
