import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, CheckCircle, ShieldCheck, Clock, Send, AlertTriangle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import PageHeader from '../components/PageHeader';
import { servicesData } from '../data/services';

export default function RequestService() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preference: 'email',
    _honeypot: '' // spam deterrent honeypot field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  // Pre-select service if passed via URL queries
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceId = params.get('service');
    if (serviceId) {
      const matched = servicesData.find(s => s.id === serviceId);
      if (matched) {
        setFormData(prev => ({ ...prev, service: matched.title }));
      }
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
    }
    if (!formData.service) newErrors.service = 'Please select a service division';
    if (!formData.message.trim()) newErrors.message = 'Please describe your request details';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check honeypot bot trap
    if (formData._honeypot) {
      console.warn('Honeypot field filled. Form submission rejected.');
      setSubmitStatus('success'); // Pretend success to confuse spammer
      return;
    }

    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus(null);

      /*
        -------------------------------------------------------------
        📧 EMAILJS INTEGRATION DESK
        -------------------------------------------------------------
        To receive submissions directly in your company inbox:
        1. Create a free account at https://www.emailjs.com/
        2. Set up your email service (e.g. Gmail / Outlook).
        3. Create an email template matching the fields:
           - fullName, company, email, phone, service, message, preference
        4. Populate the credentials below and uncomment the code block:
      */

      const EMAILJS_SERVICE_ID = 'service_5mph7s9';
      const EMAILJS_TEMPLATE_ID = 'template_kebn4vg';
      const EMAILJS_PUBLIC_KEY = 'asfkH7VIhO4L6cZKs';

      emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          fullName: formData.fullName,
          company: formData.company || 'Not Specified',
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          preference: formData.preference
        },
        EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        console.log('EmailJS response success:', response.status, response.text);
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          company: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          preference: 'email',
          _honeypot: ''
        });
      })
      .catch((err) => {
        console.error('EmailJS error sending message:', err);
        setIsSubmitting(false);
        setSubmitStatus('error');
      });
    }
  };

  const headerImages = [
    '/images/photo5.jpg',
    '/images/photo4.jpg',
    '/images/photo1.jpg'
  ];

  return (
    <div>
      <PageHeader
        title="Request Service"
        subtitle="Book a consultation desk session. Let us evaluate your financial books and ERP workflows."
        images={headerImages}
        breadcrumbs={[{ name: 'Request Service', path: '/request-service' }]}
      />

      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'flex-start' }}>
            
            {/* Left Column: Reassurance & Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <span style={{ color: 'var(--orange)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                  CONSULTATION
                </span>
                <h2>Why Work With Accosoft Solutions</h2>
                <p style={{ color: 'var(--text-mid)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  Accosoft Solutions Pvt Ltd is New Delhi's trusted desk for unified accounting. We ensure your corporate filing transitions smoothly.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ color: 'var(--orange)', marginTop: '3px' }}>
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '0.25rem' }}>Watertight Security</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: 0 }}>We adhere to direct client confidentiality rules. Your ledger databases are strictly protected.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ color: 'var(--orange)', marginTop: '3px' }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '0.25rem' }}>24-Hour Desk Response</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: 0 }}>All incoming business consultation submissions are evaluated and answered within one business day.</p>
                  </div>
                </div>
              </div>

              {/* Smaller Iframe Map */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Office Location Map
                </span>
                <div style={{ height: '200px', width: '100%', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--navy-pale)' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.4239841804245!2d77.10842231508246!3d28.736733982377224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03e51240c5f3%3A0xe54d8ec80bc1a812!2sSector%2017%2C%20Rohini%2C%20Delhi%2C%20110089!5e0!3m2!1sen!2sin!4v1625300000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Small map location of Rohini Sector 17 office"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div
              style={{
                backgroundColor: 'var(--bg-white)',
                border: '1px solid var(--navy-pale)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-md)'
              }}
              className="responsive-pad"
            >
              <h3 style={{ fontSize: '1.5rem', color: 'var(--navy)', marginBottom: '1.5rem' }}>Send Business Enquiry</h3>

              {submitStatus === 'success' && (
                <div
                  style={{
                    backgroundColor: 'rgba(74, 222, 128, 0.15)',
                    border: '1.5px solid green',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    color: 'green',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  role="alert"
                >
                  <CheckCircle size={24} style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Enquiry Sent Successfully!</strong>
                    <span style={{ fontSize: '0.85rem' }}>Our consultancy managers will contact you within 24 hours.</span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: '1.5px solid red',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    color: 'red',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  role="alert"
                >
                  <AlertTriangle size={24} style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Error Sending Message</strong>
                    <span style={{ fontSize: '0.85rem' }}>Please verify your internet connection or email credentials and try again.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Honeypot field (hidden from users, but auto-filled by spam bots) */}
                <input
                  type="text"
                  name="_honeypot"
                  value={formData._honeypot}
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      border: `1.5px solid ${errors.fullName ? 'red' : 'var(--navy-pale)'}`,
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem'
                    }}
                  />
                  {errors.fullName && <span role="alert" style={{ fontSize: '0.75rem', color: 'red', marginTop: '4px', display: 'block' }}>{errors.fullName}</span>}
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="company" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                    Company Name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Optional"
                    value={formData.company}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      border: '1.5px solid var(--navy-pale)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      border: `1.5px solid ${errors.email ? 'red' : 'var(--navy-pale)'}`,
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem'
                    }}
                  />
                  {errors.email && <span role="alert" style={{ fontSize: '0.75rem', color: 'red', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="e.g. 9811123456"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      border: `1.5px solid ${errors.phone ? 'red' : 'var(--navy-pale)'}`,
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem'
                    }}
                  />
                  {errors.phone && <span role="alert" style={{ fontSize: '0.75rem', color: 'red', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                </div>

                {/* Service Dropdown */}
                <div>
                  <label htmlFor="service" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                    Select Service Division *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      border: `1.5px solid ${errors.service ? 'red' : 'var(--navy-pale)'}`,
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem',
                      backgroundColor: 'var(--bg-white)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">-- Choose Division --</option>
                    {servicesData.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                  {errors.service && <span role="alert" style={{ fontSize: '0.75rem', color: 'red', marginTop: '4px', display: 'block' }}>{errors.service}</span>}
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                    Describe Your Request Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your accounts scale, GST volume, or ERP requirements..."
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      border: `1.5px solid ${errors.message ? 'red' : 'var(--navy-pale)'}`,
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem',
                      resize: 'vertical'
                    }}
                  ></textarea>
                  {errors.message && <span role="alert" style={{ fontSize: '0.75rem', color: 'red', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
                </div>

                {/* Contact Preference Radios */}
                <div>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}>
                    Preferred Contact Method
                  </span>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="preference"
                        value="email"
                        checked={formData.preference === 'email'}
                        onChange={handleInputChange}
                        style={{ cursor: 'pointer' }}
                      />
                      Email Address
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="preference"
                        value="phone"
                        checked={formData.preference === 'phone'}
                        onChange={handleInputChange}
                        style={{ cursor: 'pointer' }}
                      />
                      Phone Call
                    </label>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-orange"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    marginTop: '0.5rem',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? 'Sending Enquiry...' : 'Send Consultation Request'}
                  <Send size={16} />
                </button>
              </form>

              {/* Responder disclaimer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '1.25rem', color: 'var(--text-light)', fontSize: '0.8rem' }}>
                <Clock size={14} />
                <span>We usually respond within 24 business hours.</span>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
