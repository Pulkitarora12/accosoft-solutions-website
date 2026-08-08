import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, Globe } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services Provided', path: '/services' },
    { name: 'Careers', path: '/careers' },
    { name: 'Request Service', path: '/request-service' },
    { name: 'About Us', path: '/about' }
  ];

  const usefulLinks = [
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms & Conditions', path: '#' },
    { name: 'Disclaimer', path: '#' },
    { name: 'Client Support', path: '#' }
  ];

  const contactInfo = {
    address: 'B – 3/17, Sector-17, Rohini, New Delhi – 110 089 (India)',
    email: 'info@accosoftsolutions.com',
    phone: '+91 9716799777'
  };

  const googleMapsSearchUrl = 'https://maps.google.com/?q=B-3/17+Sector+17+Rohini+New+Delhi+110089';

  return (
    <footer
      id="footer-contact"
      style={{
        backgroundColor: 'var(--navy)',
        color: 'var(--bg-white)',
        paddingTop: '5rem',
        borderTop: '4px solid var(--orange)'
      }}
    >
      <div className="container">
        {/* Row 1: Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr 0.8fr 1.2fr',
            gap: '3rem',
            marginBottom: '4rem'
          }}
          className="footer-columns"
        >
          {/* Column 1: Company Logo & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem' }}>
            <Logo variant="light" size={90} showText={true} />
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Accosoft Solutions Pvt Ltd is a premier provider of financial, bookkeeping, auditing, GST, tax compliance, and modern enterprise software integration solutions. Serving businesses with integrity and precision since our incorporation in 2017.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3
              style={{
                fontSize: '1.1rem',
                color: 'var(--bg-white)',
                marginBottom: '1.5rem',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}
            >
              Quick Links
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '2px', backgroundColor: 'var(--orange)' }}></span>
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.9rem',
                      display: 'inline-block',
                      transition: 'transform var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--orange)';
                      e.target.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h3
              style={{
                fontSize: '1.1rem',
                color: 'var(--bg-white)',
                marginBottom: '1.5rem',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}
            >
              Useful Links
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '2px', backgroundColor: 'var(--orange)' }}></span>
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.9rem',
                      display: 'inline-block',
                      transition: 'transform var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--orange)';
                      e.target.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info & Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3
              style={{
                fontSize: '1.1rem',
                color: 'var(--bg-white)',
                marginBottom: '0.25rem',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}
            >
              Contact Details
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '2px', backgroundColor: 'var(--orange)' }}></span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={18} style={{ color: 'var(--orange)', flexShrink: 0, marginTop: '3px' }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.4' }}>{contactInfo.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} style={{ color: 'var(--orange)', flexShrink: 0 }} />
                <a href={`mailto:${contactInfo.email}`} style={{ color: 'rgba(255, 255, 255, 0.7)' }} onMouseEnter={(e) => e.target.style.color = 'var(--orange)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}>
                  {contactInfo.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} style={{ color: 'var(--orange)', flexShrink: 0 }} />
                <a href={`tel:${contactInfo.phone}`} style={{ color: 'rgba(255, 255, 255, 0.7)' }} onMouseEnter={(e) => e.target.style.color = 'var(--orange)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}>
                  {contactInfo.phone}
                </a>
              </div>
            </div>
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a href="https://www.facebook.com/profile.php?id=100054681493248" target="_blank" rel="noopener noreferrer" aria-label="Facebook Link" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition-fast)', color: 'var(--bg-white)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--orange)'; e.currentTarget.style.color = 'var(--bg-white)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--bg-white)'; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Twitter Link" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition-fast)', color: 'var(--bg-white)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--orange)'; e.currentTarget.style.color = 'var(--bg-white)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--bg-white)'; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn Link" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition-fast)', color: 'var(--bg-white)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--orange)'; e.currentTarget.style.color = 'var(--bg-white)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--bg-white)'; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.google.com/search?q=Accosoft+Solutions+Private+limited&stick=H4sIAAAAAAAA_-NgU1I1qDC2NEgxMExLNDCxNDU3SbK0MqgwTDWzSDFONUk1tLAwSjUxW8Sq5JicnF-cn1aiEJyfU1qSmZ9XrBBQlFmWWJKqkJOZm1mSmgIAmFjw104AAAA&hl=en&mat=Cd0kxJ0LI1fJElYBa0lj_1lwy6GdYpTdOF3MKyxvu2EysHDRcIWTHcJJhJmzyJzpR8iol6eXwwvJa0mAvwUPr6WesVziiStsxc3o3VI6MTTFstSsXPPMrrgVvRP01Av1jg&authuser=0" target="_blank" rel="noopener noreferrer" aria-label="Google Business Profile Link" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition-fast)', color: 'var(--bg-white)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--orange)'; e.currentTarget.style.color = 'var(--bg-white)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--bg-white)'; }}>
                <Globe size={18} />
              </a>
            </div>

            {/* Google QR Code section */}
            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '500' }}>Find us on Google</span>
              <a
                href="https://www.google.com/search?q=Accosoft+Solutions+Private+limited&stick=H4sIAAAAAAAA_-NgU1I1qDC2NEgxMExLNDCxNDU3SbK0MqgwTDWzSDFONUk1tLAwSjUxW8Sq5JicnF-cn1aiEJyfU1qSmZ9XrBBQlFmWWJKqkJOZm1mSmgIAmFjw104AAAA&hl=en&mat=Cd0kxJ0LI1fJElYBa0lj_1lwy6GdYpTdOF3MKyxvu2EysHDRcIWTHcJJhJmzyJzpR8iol6eXwwvJa0mAvwUPr6WesVziiStsxc3o3VI6MTTFstSsXPPMrrgVvRP01Av1jg&authuser=0"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  width: '80px',
                  height: '80px',
                  padding: '4px',
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  transition: 'transform var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img
                  src="/images/google-business-qr.png"
                  alt="Accosoft Solutions Google Business QR Code"
                  style={{ width: '100%', height: '100%', display: 'block', borderRadius: 'inherit' }}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Row 2: Google Map & CTA button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ width: '100%', maxWidth: '850px', height: '250px', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.1)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.4239841804245!2d77.10842231508246!3d28.736733982377224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03e51240c5f3%3A0xe54d8ec80bc1a812!2sSector%2017%2C%20Rohini%2C%20Delhi%2C%20110089!5e0!3m2!1sen!2sin!4v1625300000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Accosoft Solutions Location Map"
            ></iframe>
          </div>
          
          {/* Map Pill Button */}
          <a
            href={googleMapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-orange"
            style={{ textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em', gap: '8px' }}
          >
            <MapPin size={16} />
            View on Google Maps
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Row 3: Copyright bottom bar */}
      <div
        style={{
          backgroundColor: '#071F36', // Darker navy
          padding: '1.5rem 0',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'rgba(255, 255, 255, 0.5)'
        }}
      >
        <div className="container">
          <p style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} Accosoft Solutions Pvt Ltd. All rights reserved. B – 3/17, Sector-17, Rohini, New Delhi – 110089, India.
          </p>
        </div>
      </div>

      {/* Styled JSX for Responsive Grid */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          .footer-columns {
            grid-template-columns: 1.5fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 768px) {
          .footer-columns {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}} />
    </footer>
  );
}
