import React, { useState, useEffect, useRef } from 'react';
import { X, Send, AlertTriangle, CheckCircle } from 'lucide-react';
import { getTrackingPayload, clearTrackingLogs } from '../utils/tracker';

export default function LeadCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('accosoft_lead_popup_shown');
    if (popupShown) return;

    let triggerTimeout;

    // Trigger 1: 25 seconds on site
    triggerTimeout = setTimeout(() => {
      triggerPopup('time_on_site');
    }, 25000);

    // Trigger 2: Scroll past 50% depth
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollPosition / docHeight > 0.5) {
        triggerPopup('scroll_depth');
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Trigger 3: Exit intent (mouse leaves window top, desktop only)
    const handleMouseLeave = (e) => {
      if (e.clientY < 20) {
        triggerPopup('exit_intent');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    const triggerPopup = (reason) => {
      // Final guard
      if (sessionStorage.getItem('accosoft_lead_popup_shown')) return;
      
      console.log(`Lead capture popup triggered via: ${reason}`);
      sessionStorage.setItem('accosoft_lead_popup_shown', 'true');
      
      // Remove listeners
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(triggerTimeout);
      
      setIsOpen(true);
    };

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(triggerTimeout);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    
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
    
    if (!formData.consent) {
      newErrors.consent = 'You must agree to be contacted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Get final tracking logs (GDPR compliant: joined only on submission)
    const trackingData = getTrackingPayload();

    const payload = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      sessionId: trackingData.sessionId,
      searchHistory: trackingData.searchHistory,
      pageHistory: trackingData.pageHistory,
      timestamp: new Date().toISOString()
    };

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then((res) => {
      if (!res.ok) throw new Error('Failed to submit');
      return res.json();
    })
    .then((data) => {
      console.log('Lead submitted successfully:', data);
      setIsSubmitting(false);
      setSubmitStatus('success');
      clearTrackingLogs();

      // Auto close after 2.5 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    })
    .catch((err) => {
      console.error('Lead submission error:', err);
      setIsSubmitting(false);
      setSubmitStatus('error');
    });
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(11, 47, 82, 0.75)', // matching Layout modal color
        backdropFilter: 'blur(4px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.3s ease-out forwards'
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-white)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '500px',
          width: '100%',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--navy-pale)',
          position: 'relative',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close form"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'var(--text-light)',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-light)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <X size={20} />
        </button>

        {submitStatus !== 'success' ? (
          <>
            <div>
              <span
                style={{
                  color: 'var(--orange)',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.35rem'
                }}
              >
                Exclusive Consult Desk
              </span>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--navy)', margin: 0 }}>
                Get Free Financial Diagnostic Roadmap
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', marginTop: '6px', marginBottom: 0, lineHeight: 1.5 }}>
                Leave your contact details and our senior compliance advisory managers will provide a diagnostic roadmap for your company books within 24 hours.
              </p>
            </div>

            {submitStatus === 'error' && (
              <div
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1.5px solid red',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  color: 'red',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.82rem'
                }}
                role="alert"
              >
                <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                <span>Failed to send. Please verify connection and try again.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Full Name */}
              <div>
                <label htmlFor="leadFullName" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                  Full Name *
                </label>
                <input
                  id="leadFullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    border: `1.5px solid ${errors.fullName ? 'red' : 'var(--navy-pale)'}`,
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
                {errors.fullName && <span role="alert" style={{ fontSize: '0.72rem', color: 'red', marginTop: '3px', display: 'block' }}>{errors.fullName}</span>}
              </div>

              {/* Email & Phone Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label htmlFor="leadEmail" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                    Email Address *
                  </label>
                  <input
                    id="leadEmail"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.85rem',
                      border: `1.5px solid ${errors.email ? 'red' : 'var(--navy-pale)'}`,
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                  {errors.email && <span role="alert" style={{ fontSize: '0.72rem', color: 'red', marginTop: '3px', display: 'block' }}>{errors.email}</span>}
                </div>

                <div>
                  <label htmlFor="leadPhone" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                    Phone Number *
                  </label>
                  <input
                    id="leadPhone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="e.g. 9811123456"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.85rem',
                      border: `1.5px solid ${errors.phone ? 'red' : 'var(--navy-pale)'}`,
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                  {errors.phone && <span role="alert" style={{ fontSize: '0.72rem', color: 'red', marginTop: '3px', display: 'block' }}>{errors.phone}</span>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="leadMessage" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                  What are you looking for?
                </label>
                <textarea
                  id="leadMessage"
                  name="message"
                  rows="2"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="e.g., GST filings, audit services, Tally configuration..."
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    border: '1.5px solid var(--navy-pale)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.88rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                ></textarea>
              </div>

              {/* Compliance Consent Checkbox */}
              <div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.78rem', color: 'var(--text-mid)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    style={{ marginTop: '2px', cursor: 'pointer' }}
                  />
                  <span>
                    I agree to be contacted about my inquiry. *
                  </span>
                </label>
                {errors.consent && <span role="alert" style={{ fontSize: '0.72rem', color: 'red', marginTop: '3px', display: 'block' }}>{errors.consent}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-orange"
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  marginTop: '0.25rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.75 : 1
                }}
              >
                {isSubmitting ? 'Sending Request...' : 'Get Diagnostic Roadmap'}
                <Send size={15} />
              </button>
            </form>

            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
              We value your privacy. Read our{' '}
              <a href="#" style={{ color: 'var(--orange)', textDecoration: 'underline' }} onClick={(e) => e.preventDefault()}>
                Privacy Policy
              </a>.
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle size={54} style={{ color: 'green', marginBottom: '1.25rem' }} />
            <h3 style={{ fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>
              Roadmap Requested!
            </h3>
            <p style={{ color: 'var(--text-mid)', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
              Thank you, <strong>{formData.fullName}</strong>. Your consultation ticket has been generated. A senior officer will reach out to you shortly.
            </p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />
    </div>
  );
}
