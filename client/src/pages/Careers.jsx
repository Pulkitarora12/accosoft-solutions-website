import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, X, AlertTriangle, CheckCircle2, User, Mail, Phone, Award } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DiagonalBanner from '../components/DiagonalBanner';
import { jobsData } from '../data/jobs';

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  
  const modalRef = useRef(null);

  // Keyboard navigation / accessibility for the Modal dialog
  useEffect(() => {
    if (selectedJob) {
      // Focus trap
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // prevent background scrolling

      // Pre-select position
      setFormData(prev => ({ ...prev, position: selectedJob.title }));

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [selectedJob]);

  const closeModal = () => {
    setSelectedJob(null);
    setErrors({});
    setSubmitStatus(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when typing
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
    if (!formData.position) newErrors.position = 'Please select a position';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus(null);

      fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          coverLetter: formData.coverLetter || 'Not Provided'
        })
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to submit');
          return res.json();
        })
        .then(() => {
          setIsSubmitting(false);
          setSubmitStatus('success');
        })
        .catch((err) => {
          console.error('Error sending application:', err);
          setIsSubmitting(false);
          setSubmitStatus('error');
        });
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      position: '',
      coverLetter: ''
    });
    setSubmitStatus(null);
    closeModal();
  };

  const perks = [
    { title: 'Work-Life Harmony', desc: 'No unpaid overtime or chaotic shift timings. We maintain strict corporate working boundaries.', icon: 'Clock' },
    { title: 'Professional Growth', desc: 'Sponsorships for CA-inter courses, GST certifications, and ERP software training modules.', icon: 'Award' },
    { title: 'Supportive Culture', desc: 'A collaborative Delhi-based office environment where query sharing and learning are highly encouraged.', icon: 'Users' },
    { title: 'Generous Allowances', desc: 'Compensations for local business travels, dinner allowances, and client support bonuses.', icon: 'Briefcase' },
    { title: 'Modern Equipment', desc: 'Work with fast dual-monitor workstations and licensed enterprise software applications.', icon: 'Cpu' },
    { title: 'Performance Rewards', desc: 'Twice-yearly review cycles and performance-based financial bonuses for our top desks.', icon: 'TrendingUp' }
  ];

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Join Our Team"
        subtitle="Build your career in finance, taxation, compliance, and cloud software services with Accosoft Solutions."
        breadcrumbs={[{ name: 'Careers', path: '/careers' }]}
      />

      {/* Hiring accountant alert banner */}
      <div style={{ backgroundColor: 'rgba(245, 130, 31, 0.08)', borderBottom: '1px solid rgba(245, 130, 31, 0.2)', padding: '1.25rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.5rem' }}>📣</span>
            <span style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '0.95rem' }}>
              We're hiring Senior Accountants & Audit Associates! Precision is our lifestyle. Join us today.
            </span>
          </div>
          <button 
            onClick={() => {
              const firstJob = jobsData.find(j => j.id === 'senior-accountant');
              if (firstJob) setSelectedJob(firstJob);
            }} 
            className="btn btn-orange" 
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.82rem', gap: '4px' }}
          >
            Apply Now <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Perks section */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span style={{ color: 'var(--orange)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
              BENEFITS
            </span>
            <h2>Why Work With Us</h2>
            <p className="lead">We prioritize skill growth, financial stability, and employee wellness in New Delhi.</p>
          </div>

          <div className="grid-3">
            {perks.map((perk, idx) => {
              return (
                <div key={idx} className="card" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--orange)', flexShrink: 0 }}>
                    {idx % 3 === 0 ? <Clock size={24} /> : idx % 3 === 1 ? <Award size={24} /> : <Briefcase size={24} />}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{perk.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: 0 }}>{perk.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Listings Grid */}
      <section className="bg-light" style={{ padding: '6.5rem 0', borderTop: '1px solid var(--navy-pale)' }}>
        <div className="container">
          <div className="section-header">
            <span style={{ color: 'var(--orange)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
              CURRENT OPENINGS
            </span>
            <h2>Explore Open Desks</h2>
            <p className="lead">Join our core offices in Sector-17, Rohini. We hire individuals passionate about numerical precision.</p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              maxWidth: '900px',
              margin: '0 auto'
            }}
          >
            {jobsData.map((job) => (
              <div
                key={job.id}
                style={{
                  backgroundColor: 'var(--bg-white)',
                  border: '1px solid var(--navy-pale)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  transition: 'all var(--transition-normal)'
                }}
                className="job-card"
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.3rem', margin: 0 }}>{job.title}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Briefcase size={14} /> {job.department}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} /> {job.type}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-mid)', marginTop: '8px', marginBottom: 0, maxWidth: '600px' }}>
                    {job.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedJob(job)}
                  className="btn btn-orange"
                  style={{
                    padding: '0.6rem 1.25rem',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-pill)',
                    flexShrink: 0
                  }}
                >
                  View & Apply
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Applications Diagonal Banner */}
      <DiagonalBanner variant="navy">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
          <h2 style={{ color: 'var(--bg-white)', margin: 0 }}>Don't See Your Specialty Listed?</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', fontSize: '1.1rem', margin: 0 }}>
            We are always looking for CA-inters, certified accountants, and software configuration specialists. Send your CV to our talent database.
          </p>
          <button
            onClick={() => setSelectedJob({ title: 'General Application Desk', department: 'General Database', location: 'Rohini, New Delhi', type: 'Full-Time / Part-Time' })}
            className="btn btn-orange"
          >
            Submit General CV
            <ArrowRight size={16} />
          </button>
        </div>
      </DiagonalBanner>

      {/* Application Modal Overlay */}
      {selectedJob && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(11, 47, 82, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            overflowY: 'auto'
          }}
        >
          <div
            ref={modalRef}
            style={{
              backgroundColor: 'var(--bg-white)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '650px',
              width: '100%',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--navy-pale)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh',
              animation: 'fadeIn var(--transition-fast) forwards'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid var(--navy-pale)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {selectedJob.department}
                </span>
                <h2 id="modal-title" style={{ fontSize: '1.4rem', margin: 0, color: 'var(--navy)' }}>
                  {selectedJob.title}
                </h2>
              </div>
              <button
                onClick={closeModal}
                aria-label="Close Job Details"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-light)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div style={{ padding: '2rem', overflowY: 'auto', flexGrow: 1 }}>
              {submitStatus !== 'success' ? (
                <div>
                  {selectedJob.requirements && (
                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{ color: 'var(--navy)', marginBottom: '0.75rem' }}>Minimum Prerequisites:</h4>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {selectedJob.requirements.map((req, idx) => (
                          <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: 'var(--text-mid)' }}>
                            <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* FORM HEADER NOTE ON RESUMES */}
                  <div
                    style={{
                      backgroundColor: 'var(--navy-pale)',
                      borderLeft: '4px solid var(--navy)',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '1.5rem',
                      fontSize: '0.8rem',
                      color: 'var(--navy)'
                    }}
                  >
                    <strong>Resume Notice:</strong> To complete your application, please email your resume/CV and attachments directly to our team.
                  </div>

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
                        <strong style={{ display: 'block', fontSize: '0.95rem' }}>Submission Failed</strong>
                        <span style={{ fontSize: '0.85rem' }}>Please verify your details or connection and try again.</span>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                        Full Name *
                      </label>
                      <div style={{ position: 'relative' }}>
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
                      </div>
                      {errors.fullName && <span role="alert" style={{ fontSize: '0.75rem', color: 'red', marginTop: '4px', display: 'block' }}>{errors.fullName}</span>}
                    </div>

                    {/* Email & Phone */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-2">
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
                    </div>

                    {/* Selected position */}
                    <div>
                      <label htmlFor="position" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                        Selected Desk *
                      </label>
                      <input
                        id="position"
                        name="position"
                        type="text"
                        readOnly
                        value={formData.position}
                        style={{
                          width: '100%',
                          padding: '0.65rem 1rem',
                          border: '1.5px solid var(--navy-pale)',
                          backgroundColor: 'var(--bg-light)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.9rem',
                          color: 'var(--text-light)',
                          cursor: 'not-allowed'
                        }}
                      />
                    </div>

                    {/* Cover Letter */}
                    <div>
                      <label htmlFor="coverLetter" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                        Cover Letter / Message
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        rows="3"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        placeholder="Tell us briefly why you would like to join our compliance/accounting desk..."
                        style={{
                          width: '100%',
                          padding: '0.65rem 1rem',
                          border: '1.5px solid var(--navy-pale)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.9rem',
                          resize: 'vertical'
                        }}
                      ></textarea>
                    </div>

                    {/* Resume Submission Instruction */}
                    <div
                      style={{
                        backgroundColor: 'rgba(245, 130, 31, 0.05)',
                        border: '1px solid rgba(245, 130, 31, 0.3)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.25rem',
                        textAlign: 'center',
                      }}
                    >
                      <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '8px' }}>✉️</span>
                      <h4 style={{ fontSize: '1rem', color: 'var(--navy)', margin: '0 0 6px 0' }}>
                        Please Email Your Resume / CV
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', margin: '0 0 10px 0', lineHeight: '1.5' }}>
                        To complete your application, please email your resume/CV and any attachments directly to{' '}
                        <a 
                          href={`mailto:info@accosoftsolutions.com?subject=Application%20for%20${encodeURIComponent(formData.position || 'Position')}`} 
                          style={{ color: 'var(--orange)', fontWeight: 600, textDecoration: 'underline' }}
                        >
                          info@accosoftsolutions.com
                        </a>.
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', margin: 0 }}>
                        Please mention the position (<strong>{formData.position}</strong>) in the subject line of your email.
                      </p>
                    </div>

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
                      {isSubmitting ? 'Submitting Application...' : 'Submit Contact Details'}
                    </button>
                  </form>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle2 size={54} style={{ color: 'green', marginBottom: '1.25rem' }} />
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Application Submitted!</h3>
                  <p style={{ color: 'var(--text-mid)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                    Thank you! Your application details have been received successfully.
                  </p>
                  <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                    Please make sure you have emailed your resume/CV and attachments to{' '}
                    <a 
                      href={`mailto:info@accosoftsolutions.com?subject=Application%20for%20${encodeURIComponent(formData.position || 'Position')}`} 
                      style={{ color: 'var(--orange)', fontWeight: 600, textDecoration: 'underline' }}
                    >
                      info@accosoftsolutions.com
                    </a>.
                  </p>
                  <button onClick={handleReset} className="btn btn-navy">
                    Close Window
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .job-card {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .job-card button {
            width: 100% !important;
          }
        }
      `}} />
    </div>
  );
}
