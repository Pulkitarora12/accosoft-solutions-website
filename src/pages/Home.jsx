import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Award, Clock, Users, ArrowUpRight, BarChart, Settings, Check, AlertTriangle, Star } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ImageRotator from '../components/ImageRotator';
import LogoMarquee from '../components/LogoMarquee';
import StatsCounter from '../components/StatsCounter';
import DiagonalBanner from '../components/DiagonalBanner';
import AwardsPanel from '../components/AwardsPanel';
import { servicesData } from '../data/services';
import { testimonialsData } from '../data/testimonials';
import Notices from '../components/Notices';

export default function Home() {
  // Hero slide images (5 user-provided images)
  const heroImages = [
    '/images/photo1.jpg',
    '/images/photo2.jpg',
    '/images/photo3.jpg',
    '/images/photo4.jpg',
    '/images/photo5.jpg'
  ];

  // About preview images
  const aboutPreviewImages = [
    '/images/photo1.jpg',
    '/images/photo4.jpg',
    '/images/photo6.jpg'
  ];

  // Pinned Unsplash image list for benefits (6 tiles, 2 images each)
  const benefitsImages = [
    ['/images/photo3.jpg', '/images/photo6.jpg'],
    ['/images/photo2.jpg', '/images/photo4.jpg'],
    ['/images/photo1.jpg', '/images/photo2.jpg'],
    ['/images/photo5.jpg', '/images/photo3.jpg'],
    ['/images/photo4.jpg', '/images/photo1.jpg'],
    ['/images/photo6.jpg', '/images/photo5.jpg']
  ];

  const benefits = [
    { title: 'Zero Compliance Penalties', desc: '100% accurate filings, helping you avoid legal friction and unwanted fines.', icon: Shield },
    { title: 'Experienced Professionals', desc: 'CA-inters, software engineers, and advisory consultants dedicated to your success.', icon: Award },
    { title: 'Real-Time MIS Reports', desc: 'Detailed, accessible performance dashboards to make smart decisions immediately.', icon: BarChart },
    { title: 'Cloud Infrastructure', desc: 'Access your records securely 24/7 via certified remote ERP and database frameworks.', icon: Settings },
    { title: 'Affordable Packages', desc: 'Flexible, transparent fee structures tailored for startups, SMEs, and corporate giants.', icon: Clock },
    { title: 'Robust Internal Audits', desc: 'Establish watertight internal controls to prevent database anomalies and leakages.', icon: CheckCircle2 }
  ];

  // Select 5 services for the Home page grid preview
  const homeServices = servicesData.slice(0, 5);

  // Feedback Form States
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackCompany, setFeedbackCompany] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSubmitStatus, setFeedbackSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [feedbackErrors, setFeedbackErrors] = useState({});

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!feedbackName.trim()) errors.name = 'Name is required';
    if (!feedbackMessage.trim()) errors.message = 'Message/Review is required';

    if (Object.keys(errors).length > 0) {
      setFeedbackErrors(errors);
      return;
    }

    setFeedbackErrors({});
    setIsSubmittingFeedback(true);

    const EMAILJS_SERVICE_ID = 'service_5mph7s9';
    const EMAILJS_TEMPLATE_ID = 'template_kebn4vg';
    const EMAILJS_PUBLIC_KEY = 'asfkH7VIhO4L6cZKs';

    const templateParams = {
      fullName: feedbackName,
      company: feedbackCompany || 'Not Specified',
      email: 'review-submission@accosoft.com',
      phone: `Rating: ${feedbackRating || 'Not Rated'} Stars`,
      service: 'Client Review / Testimonial Submission',
      message: feedbackMessage,
      preference: 'email'
    };

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )
    .then((response) => {
      console.log('EmailJS review submission success:', response.status, response.text);
      setIsSubmittingFeedback(false);
      setFeedbackSubmitStatus('success');
      setFeedbackName('');
      setFeedbackCompany('');
      setFeedbackRating(0);
      setFeedbackMessage('');
    })
    .catch((err) => {
      console.error('EmailJS review submission error:', err);
      setIsSubmittingFeedback(false);
      setFeedbackSubmitStatus('error');
    });
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* 1. HERO SLIDESHOW SECTION */}
      <section
        style={{
          height: 'calc(100vh - 140px)',
          minHeight: '550px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          padding: 0,
          color: 'var(--bg-white)'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
          <ImageRotator
            images={heroImages}
            interval={4500}
            overlay={true}
            overlayOpacity={0.65}
            borderRadius="0"
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '650px', animation: 'fadeIn 1s ease-out' }}>
            <span
              style={{
                display: 'inline-block',
                backgroundColor: 'rgba(245, 130, 31, 0.15)',
                color: 'var(--orange)',
                border: '1px solid var(--orange)',
                padding: '0.4rem 1.25rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem'
              }}
            >
              ★ ACCOUNTING-FIRST COMPLIANCE COMPANY ★
            </span>
            <h1
              style={{
                color: 'var(--bg-white)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '1.5rem',
                textShadow: '0 2px 8px rgba(0,0,0,0.4)'
              }}
            >
              Transforming Financial Governance & Enterprise Software
            </h1>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                marginBottom: '2.5rem',
                lineHeight: 1.6,
                textShadow: '0 1px 4px rgba(0,0,0,0.3)'
              }}
            >
              Accosoft Solutions Pvt Ltd is a specialized Accounting-First company delivering high-integrity bookkeeping, auditing, GST compliance, and cloud ERP systems to empower Indian businesses.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/request-service" className="btn btn-orange">
                Request Free Audit
                <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn btn-ghost-dark">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLIENT LOGO MARQUEE */}
      <LogoMarquee />

      {/* 4. ABOUT PREVIEW */}
      <section style={{ padding: '6.5rem 0' }}>
        <div className="container">
          <div className="grid-2">
            {/* Left: Rotating Image */}
            <div style={{ height: '400px', width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--navy-pale)' }}>
              <ImageRotator
                images={aboutPreviewImages}
                interval={4000}
                borderRadius="var(--radius-lg)"
              />
            </div>

            {/* Right: Text Content */}
            <div style={{ paddingLeft: '1rem' }} className="responsive-pad">
              <span style={{ color: 'var(--orange)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                ABOUT OUR COMPANY
              </span>
              <h2>Pioneering Financial Excellence Since 2017</h2>
              <p style={{ color: 'var(--text-mid)', marginBottom: '1.5rem' }}>
                Accosoft Solutions Pvt Ltd was formed in 2017 as a dedicated practice, bringing together a team with over 30 years of professional work experience. Operating out of Rohini, New Delhi, we provide a unified desk combining standard bookkeeping expertise with advanced compliance frameworks.
              </p>
              
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 500, color: 'var(--navy)' }}>
                  <Check size={18} style={{ color: 'var(--orange)' }} /> Registered Corporate Consultants under MCA
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 500, color: 'var(--navy)' }}>
                  <Check size={18} style={{ color: 'var(--orange)' }} /> Unified Bookkeeping & Cloud ERP Integration
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 500, color: 'var(--navy)' }}>
                  <Check size={18} style={{ color: 'var(--orange)' }} /> Client retention of 98.6% across Delhi-NCR
                </li>
              </ul>

              <Link to="/about" className="btn btn-navy">
                Learn More About Us
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ACCOUNTING & AUDITING MATTER HIGHLIGHT SECTION */}
      <section style={{ padding: '6.5rem 0 3.5rem', backgroundColor: 'var(--bg-light)', borderTop: '1px solid var(--navy-pale)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '4.5rem',
            alignItems: 'center',
            backgroundColor: 'var(--bg-white)',
            borderRadius: 'var(--radius-lg)',
            padding: '4rem 3rem',
            border: '2px solid var(--orange)',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
            overflow: 'hidden'
          }} className="grid-2">
            
            {/* Orange core focus ribbon */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '-35px',
              background: 'var(--orange)',
              color: '#fff',
              padding: '0.4rem 3rem',
              transform: 'rotate(45deg)',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              boxShadow: 'var(--shadow-sm)',
              textTransform: 'uppercase'
            }}>
              Core Focus
            </div>

            <div>
              <span style={{ color: 'var(--orange)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                SPECIAL POSITIONING
              </span>
              <h2 style={{ fontSize: '1.9rem', marginBottom: '1.25rem', lineHeight: '1.3' }}>
                Why Accounting, Auditing & Bookkeeping Matter
              </h2>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.92rem', lineHeight: '1.65', marginBottom: '2rem' }}>
                At Accosoft Solutions, we are an <strong>accounting-first company</strong>. While compliance and registrations are necessary steps, structured bookkeeping and robust audits are the foundational heartbeat of any healthy business. Here is why prioritizing your core accounts pays off.
              </p>
              <Link to="/services/accounting-auditing" className="btn btn-orange" style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}>
                Explore Accounting Suite
                <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              {[
                { icon: '⚖️', title: 'Regulatory Compliance', text: 'Avoid audits, interest liabilities, and tax penalties through certified double-entry ledger audits and exact accounting alignment.' },
                { icon: '📈', title: 'Informed Decision-Making', text: 'Real-time profit tracking and accurate cash flow visibility allow you to manage budgets and scale operations with total certainty.' },
                { icon: '🛡️', title: 'Fraud & Error Prevention', text: 'Robust internal control reviews, monthly reconciliations, and ledgers audit check loops intercept transactional anomalies early.' },
                { icon: '💰', title: 'Investor & Lender Readiness', text: 'Audit-ready financial histories make securing bank credit lines, overdraft limits, and venture capital equity straightforward.' }
              ].map((point, index) => (
                <div key={index} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    backgroundColor: 'rgba(245, 130, 31, 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.2rem', flexShrink: 0
                  }}>
                    {point.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.25rem' }}>{point.title}</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', margin: 0, lineHeight: 1.45 }}>{point.text}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. TESTIMONIAL BAND */}
      <section className="bg-navy" style={{ padding: '6rem 0' }}>
        <div className="container">
          
          {/* Centered Heading */}
          <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <span
              style={{
                color: 'var(--orange)',
                fontWeight: 800,
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.75rem'
              }}
            >
              TESTIMONIALS
            </span>
            <h2 style={{ color: 'var(--bg-white)', marginBottom: '1.25rem', display: 'block' }}>
              What Our Clients Say About Our Dedicated Desk
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '800px', margin: '0 auto' }}>
              From small enterprise setups in New Delhi to corporate supply chains across India, our accounting and ERP deployment services are rated five stars for compliance consistency and expert technical support.
            </p>
          </div>

          {/* 3-Column Grid of Cards */}
          <div className="grid-3" style={{ marginBottom: '5rem' }}>
            {testimonialsData.slice(0, 3).map((item, idx) => {
              const initials = item.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

              return (
                <div
                  key={idx}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.35)';
                    e.currentTarget.style.borderColor = 'rgba(245, 130, 31, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-md)',
                    padding: '2.25rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'default'
                  }}
                >
                  {/* Stylized background quote mark */}
                  <span style={{
                    position: 'absolute',
                    top: '10px',
                    right: '20px',
                    fontSize: '5rem',
                    color: 'rgba(255, 255, 255, 0.06)',
                    fontFamily: 'Georgia, serif',
                    lineHeight: 1,
                    userSelect: 'none'
                  }}>
                    “
                  </span>

                  <p style={{ 
                    color: 'rgba(255,255,255,0.85)', 
                    fontSize: '0.92rem', 
                    fontStyle: 'italic', 
                    margin: 0, 
                    lineHeight: 1.6, 
                    zIndex: 1,
                    flexGrow: 1 
                  }}>
                    "{item.text}"
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', zIndex: 1, marginTop: 'auto' }}>
                    {item.avatar ? (
                      <img 
                        src={item.avatar} 
                        alt={item.name} 
                        style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <div style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--orange)',
                        color: 'var(--bg-white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        flexShrink: 0
                      }}>
                        {initials}
                      </div>
                    )}
                    <div>
                      <h4 style={{ color: 'var(--bg-white)', fontSize: '0.95rem', marginBottom: '2px', fontWeight: 600 }}>{item.name}</h4>
                      <p style={{ color: 'var(--orange)', fontSize: '0.78rem', margin: 0, fontWeight: 700 }}>{item.company}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feedback Form Section */}
          <div 
            style={{
              maxWidth: '650px',
              margin: '0 auto',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-md)',
              padding: '2.5rem 3rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
            }}
          >
            {feedbackSubmitStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(74, 222, 128, 0.15)',
                  color: '#4ade80',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}>
                  <Check size={28} />
                </div>
                <h3 style={{ color: 'var(--bg-white)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Review Submitted!</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                  Thank you for sharing your experience. Your feedback has been sent to our management desk for manual review.
                </p>
                <button
                  onClick={() => setFeedbackSubmitStatus('idle')}
                  className="btn btn-ghost-dark"
                  style={{ marginTop: '1.5rem', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                >
                  Submit Another Review
                </button>
              </div>
            ) : (
              <div>
                <h3 style={{ color: 'var(--bg-white)', fontSize: '1.35rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                  Share Your Feedback
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', marginBottom: '2rem', textAlign: 'center' }}>
                  We value your experience. Submit your review or suggestion directly to our management desk.
                </p>

                {feedbackSubmitStatus === 'error' && (
                  <div 
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.15)',
                      borderLeft: '4px solid #ef4444',
                      padding: '1rem',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '1.5rem',
                      color: '#fca5a5',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                    role="alert"
                  >
                    <AlertTriangle size={20} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.85rem' }}>Error submitting review. Please verify your connection and try again.</span>
                  </div>
                )}

                <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Name */}
                  <div>
                    <label htmlFor="feedbackName" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '6px' }}>
                      Your Name *
                    </label>
                    <input
                      id="feedbackName"
                      type="text"
                      required
                      value={feedbackName}
                      onChange={(e) => setFeedbackName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 1rem',
                        border: `1.5px solid ${feedbackErrors.name ? '#ef4444' : 'rgba(255,255,255,0.15)'}`,
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        color: 'var(--bg-white)',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = 'var(--orange)'}
                      onBlur={e => e.currentTarget.style.borderColor = feedbackErrors.name ? '#ef4444' : 'rgba(255,255,255,0.15)'}
                    />
                    {feedbackErrors.name && (
                      <span role="alert" style={{ fontSize: '0.75rem', color: '#fca5a5', marginTop: '4px', display: 'block' }}>
                        {feedbackErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="feedbackCompany" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '6px' }}>
                      Company Name (Optional)
                    </label>
                    <input
                      id="feedbackCompany"
                      type="text"
                      placeholder="e.g. Acme Corporation"
                      value={feedbackCompany}
                      onChange={(e) => setFeedbackCompany(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 1rem',
                        border: '1.5px solid rgba(255,255,255,0.15)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        color: 'var(--bg-white)',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = 'var(--orange)'}
                      onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                    />
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '6px' }}>
                      Rating (Optional)
                    </span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackRating(star)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.1s ease'
                          }}
                          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                        >
                          <Star
                            size={22}
                            fill={star <= feedbackRating ? 'var(--orange)' : 'none'}
                            color={star <= feedbackRating ? 'var(--orange)' : 'rgba(255,255,255,0.3)'}
                            style={{ transition: 'color 0.2s ease, fill 0.2s ease' }}
                          />
                        </button>
                      ))}
                      {feedbackRating > 0 && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--orange)', fontWeight: 700, marginLeft: '6px' }}>
                          ({feedbackRating} / 5)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Review Textarea */}
                  <div>
                    <label htmlFor="feedbackMessage" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '6px' }}>
                      Your Review / Message *
                    </label>
                    <textarea
                      id="feedbackMessage"
                      rows={4}
                      required
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 1rem',
                        border: `1.5px solid ${feedbackErrors.message ? '#ef4444' : 'rgba(255,255,255,0.15)'}`,
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        color: 'var(--bg-white)',
                        outline: 'none',
                        resize: 'vertical',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = 'var(--orange)'}
                      onBlur={e => e.currentTarget.style.borderColor = feedbackErrors.message ? '#ef4444' : 'rgba(255,255,255,0.15)'}
                    />
                    {feedbackErrors.message && (
                      <span role="alert" style={{ fontSize: '0.75rem', color: '#fca5a5', marginTop: '4px', display: 'block' }}>
                        {feedbackErrors.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingFeedback}
                    className="btn btn-orange"
                    style={{
                      marginTop: '0.5rem',
                      alignSelf: 'center',
                      minWidth: '180px',
                      fontSize: '0.9rem',
                      padding: '0.65rem 1.5rem',
                      cursor: isSubmittingFeedback ? 'not-allowed' : 'pointer',
                      opacity: isSubmittingFeedback ? 0.75 : 1
                    }}
                  >
                    {isSubmittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. SERVICES PREVIEW GRID */}
      <section style={{ padding: '6.5rem 0', backgroundColor: 'var(--bg-white)', borderTop: '1px solid var(--navy-pale)' }}>
        <div className="container">
          <div className="section-header">
            <span style={{ color: 'var(--orange)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
              OUR DIVISIONS
            </span>
            <h2>Services Provided By Accosoft</h2>
            <p className="lead">Reliable, professional, and tech-driven finance advisory & software configuration desks.</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2.5rem'
            }}
          >
            {(() => {
              // Curate a diverse set of featured services across categories
              const featuredIds = ['bookkeeping', 'auditing-assurance', 'gst-registration', 'itr-efiling', 'pvt-ltd', 'trademark'];
              const homeServicesCurated = featuredIds.map(id => servicesData.find(s => s.id === id)).filter(Boolean);
              
              return homeServicesCurated.map((service, idx) => {
                const isCoreSpecialty = service.category === 'accounting-auditing';
                
                return (
                  <div
                    key={service.id}
                    className="card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      padding: 0,
                      border: isCoreSpecialty ? '2px solid var(--orange)' : '1px solid var(--navy-pale)',
                      boxShadow: isCoreSpecialty ? 'var(--shadow-md)' : 'var(--shadow-sm)'
                    }}
                  >
                    {/* 4:3 Rotating Card Image */}
                    <div style={{ height: '220px', width: '100%', borderBottom: '1px solid var(--navy-pale)', position: 'relative' }}>
                      {isCoreSpecialty && (
                        <div style={{
                          position: 'absolute',
                          top: '15px',
                          left: '15px',
                          backgroundColor: 'var(--orange)',
                          color: '#fff',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          zIndex: 10,
                          boxShadow: 'var(--shadow-sm)'
                        }}>
                          Core Specialty
                        </div>
                      )}
                      <ImageRotator
                        images={service.images}
                        interval={4500 + idx * 500}
                        borderRadius="var(--radius-md) var(--radius-md) 0 0"
                      />
                    </div>

                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: isCoreSpecialty ? 'var(--orange)' : 'var(--navy)' }}>
                        {service.title}
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '1.5rem', flexGrow: 1 }}>
                        {service.shortDesc}
                      </p>
                      <Link
                        to={`/services/${service.category}#${service.id}`}
                        style={{
                          marginTop: 'auto',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: isCoreSpecialty ? 'var(--orange)' : 'var(--navy)'
                        }}
                      >
                        View Details
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/services" className="btn btn-navy">
              Explore All Categories
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. DIAGONAL BANNER - SOLID NAVY */}
      <DiagonalBanner variant="navy">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
          <h2 style={{ color: 'var(--bg-white)', margin: 0 }}>Streamline Your Financial & Compliance Workflows Today</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', fontSize: '1.1rem', margin: 0 }}>
            Request a free assessment of your books of accounts or ERP systems. Our consultants will respond with a diagnostic roadmap within 24 hours.
          </p>
          <Link to="/request-service" className="btn btn-orange" style={{ marginTop: '0.5rem' }}>
            Get Free Consultation
            <ArrowRight size={16} />
          </Link>
        </div>
      </DiagonalBanner>

      {/* 7. BENEFITS GRID (3x2 tiles, rotating images) */}
      <section style={{ padding: '6.5rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span style={{ color: 'var(--orange)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
              ADVANTAGES
            </span>
            <h2>Why Choose Accosoft Solutions</h2>
            <p className="lead">Partnering with us gives you high efficiency and bulletproof compliance structure.</p>
          </div>

          <div className="grid-3">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--bg-white)',
                    border: '1px solid var(--navy-pale)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all var(--transition-normal)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'var(--navy-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--navy-pale)';
                  }}
                >
                  {/* Small Rotating Image at Top of Benefit Card */}
                  <div style={{ height: '140px', width: '100%' }}>
                    <ImageRotator
                      images={benefitsImages[idx]}
                      interval={4500}
                      borderRadius="0"
                    />
                  </div>

                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                      <div style={{ color: 'var(--orange)', flexShrink: 0 }}>
                        <Icon size={20} />
                      </div>
                      <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{benefit.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: 0 }}>
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. DIAGONAL BANNER - WHY CHOOSE US (2x2 icon badges, light-gray) */}
      <DiagonalBanner variant="light">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--navy)' }}>Accosoft Client Support Standards</h2>
          <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>Four core operating principles directing our consultancy desk across New Delhi.</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2.5rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}
          className="grid-2"
        >
          {/* Badge 1 */}
          <div 
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--orange)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'var(--navy-pale)';
            }}
            style={{ 
              display: 'flex', 
              gap: '15px', 
              backgroundColor: 'var(--bg-white)', 
              padding: '1.75rem', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--navy-pale)',
              transition: 'all var(--transition-normal)'
            }}
          >
            <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'rgba(245, 130, 31, 0.1)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--navy)', marginBottom: '0.25rem' }}>Professional Integrity</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', margin: 0, lineHeight: 1.5 }}>Strict data nondisclosure protocols. Your software records and banking details remain completely secure.</p>
            </div>
          </div>

          {/* Badge 2 */}
          <div 
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--orange)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'var(--navy-pale)';
            }}
            style={{ 
              display: 'flex', 
              gap: '15px', 
              backgroundColor: 'var(--bg-white)', 
              padding: '1.75rem', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--navy-pale)',
              transition: 'all var(--transition-normal)'
            }}
          >
            <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'rgba(245, 130, 31, 0.1)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Award size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--navy)', marginBottom: '0.25rem' }}>Accurate Auditing</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', margin: 0, lineHeight: 1.5 }}>Comprehensive reconciliations backing balance sheets. Aligned with ICAI and Ind AS standards.</p>
            </div>
          </div>

          {/* Badge 3 */}
          <div 
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--orange)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'var(--navy-pale)';
            }}
            style={{ 
              display: 'flex', 
              gap: '15px', 
              backgroundColor: 'var(--bg-white)', 
              padding: '1.75rem', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--navy-pale)',
              transition: 'all var(--transition-normal)'
            }}
          >
            <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'rgba(245, 130, 31, 0.1)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--navy)', marginBottom: '0.25rem' }}>Real-time Compliance</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', margin: 0, lineHeight: 1.5 }}>Timely filings of GST and direct taxes. Designed to help you avoid late fees and interest.</p>
            </div>
          </div>

          {/* Badge 4 */}
          <div 
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--orange)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'var(--navy-pale)';
            }}
            style={{ 
              display: 'flex', 
              gap: '15px', 
              backgroundColor: 'var(--bg-white)', 
              padding: '1.75rem', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--navy-pale)',
              transition: 'all var(--transition-normal)'
            }}
          >
            <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'rgba(245, 130, 31, 0.1)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Users size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--navy)', marginBottom: '0.25rem' }}>Dedicated Advisory</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', margin: 0, lineHeight: 1.5 }}>A dedicated point-of-contact manager assigned to your organization. Instant support via phone, email, or Slack.</p>
            </div>
          </div>
        </div>
      </DiagonalBanner>

      {/* 9. STATS COUNTER */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <StatsCounter />
        </div>
      </section>

      {/* 10. CERTIFICATIONS/AWARDS ROWS */}
      <AwardsPanel />

      {/* 11. CTA/DEMO SECTION */}
      <section style={{ padding: '6.5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <h2 style={{ display: 'block', marginBottom: '1rem' }}>Ready to Experience Watertight Financial Control?</h2>
          <p className="lead" style={{ marginBottom: '2.5rem' }}>
            Book a 30-minute demonstration of our software platforms and see how our GST and accounting desks can save your team hours of monthly admin.
          </p>
          <Link to="/request-service" className="btn btn-orange">
            Schedule Live Demo
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .responsive-pad {
            padding-left: 0 !important;
            margin-top: 1.5rem;
          }
        }
      `}} />
    </div>
  );
}
