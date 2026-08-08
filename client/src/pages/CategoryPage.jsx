import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, MessageSquare } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DiagonalBanner from '../components/DiagonalBanner';
import { serviceCategories } from '../data/services';

// Unsplash images keyed by category slug
const categoryImages = {
  'income-tax': [
    '/images/photo1.jpg',
    '/images/photo2.jpg',
    '/images/photo3.jpg'
  ],
  'accounting-auditing': [
    '/images/photo4.jpg',
    '/images/photo5.jpg',
    '/images/photo6.jpg'
  ],
  'gst': [
    '/images/photo2.jpg',
    '/images/photo3.jpg',
    '/images/photo4.jpg'
  ],
  'business-registration': [
    '/images/photo5.jpg',
    '/images/photo6.jpg',
    '/images/photo1.jpg'
  ],
  'other-registration': [
    '/images/photo3.jpg',
    '/images/photo4.jpg',
    '/images/photo5.jpg'
  ]
};

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const [hoveredId, setHoveredId] = useState(null);

  // Find matching category
  const category = serviceCategories.find(c => c.slug === categorySlug);

  // 404-style redirect for unknown slugs
  if (!category) {
    return <Navigate to="/services" replace />;
  }

  const images = categoryImages[category.slug] || categoryImages['income-tax'];

  return (
    <div>
      <PageHeader
        title={category.title}
        subtitle={category.description}
        images={images}
        breadcrumbs={[
          { name: 'Services', path: '/services' },
          { name: category.shortTitle, path: `/services/${category.slug}` }
        ]}
      />

      {/* Services Grid */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">

          {/* Breadcrumb-style back link */}
          <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link
              to="/services"
              style={{
                color: 'var(--text-light)', fontSize: '0.875rem',
                fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px'
              }}
            >
              ← All Services
            </Link>
            <ChevronRight size={14} color="var(--text-light)" />
            <span style={{ color: 'var(--navy)', fontSize: '0.875rem', fontWeight: 700 }}>
              {category.title}
            </span>
          </div>

          <div className="section-header" style={{ marginBottom: '3.5rem' }}>
            <span style={{
              color: category.color, fontWeight: 800, fontSize: '0.85rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              display: 'block', marginBottom: '0.75rem'
            }}>
              {category.services.length} SERVICES
            </span>
            <h2>{category.title} Services</h2>
            <p className="lead">{category.description}</p>
            {category.slug === 'accounting-auditing' && (
              <div style={{
                marginTop: '2rem',
                backgroundColor: 'rgba(245, 130, 31, 0.05)',
                borderLeft: '4px solid var(--orange)',
                padding: '1.5rem 2rem',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'left',
                maxWidth: '800px',
                margin: '2rem auto 0'
              }}>
                <h4 style={{ color: 'var(--navy)', fontSize: '1.05rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                  Decades of Combined Numerical Precision & Corporate Audit Expertise
                </h4>
                <p style={{ color: 'var(--text-mid)', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
                  Accosoft Solutions was built on a foundation of accounting excellence. Our dedicated desks combine double-entry precision with deep familiarity with Indian statutory frameworks (Companies Act 2013, Indian AS, Income Tax Rules). Whether configuring multi-state Tally ERP networks or conducting intensive internal risk audits, our certified team acts as your in-house financial controller.
                </p>
              </div>
            )}
          </div>

          {/* 3-col grid desktop, 1-col mobile */}
          <div className="grid-3">
            {category.services.map((svc) => {
              const isHovered = hoveredId === svc.id;
              return (
                <div
                  key={svc.id}
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    padding: '1.75rem',
                    borderTop: `3px solid ${isHovered ? category.color : 'var(--navy-pale)'}`,
                    transition: 'all 0.25s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={() => setHoveredId(svc.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Service name */}
                  <h3 style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: isHovered ? category.color : 'var(--navy)',
                    marginBottom: '0.6rem',
                    lineHeight: 1.35,
                    transition: 'color 0.2s ease'
                  }}>
                    {svc.name}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-mid)',
                    lineHeight: 1.65,
                    flexGrow: 1,
                    marginBottom: '1.5rem'
                  }}>
                    {svc.description}
                  </p>

                  {/* CTA Button */}
                  <Link
                    to={`/request-service?service=${svc.id}`}
                    className="btn btn-orange"
                    style={{
                      fontSize: '0.82rem',
                      padding: '0.55rem 1.1rem',
                      alignSelf: 'flex-start',
                      gap: '5px'
                    }}
                  >
                    Get Started <ArrowRight size={13} />
                  </Link>
                </div>
              );
            })}
          </div>

          {category.slug === 'gst' && (
            <div style={{ 
              marginTop: '3.5rem', 
              textAlign: 'center',
              borderTop: '1px solid var(--navy-pale)',
              paddingTop: '2.5rem'
            }}>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Need to perform a direct login, check portal logs, or verify an active registration status?
              </p>
              <a
                href="https://www.gst.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-navy"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Visit the Official GST Portal (gst.gov.in)
                <ArrowRight size={14} />
              </a>
            </div>
          )}

          {category.slug === 'income-tax' && (
            <div style={{ 
              marginTop: '3.5rem', 
              textAlign: 'center',
              borderTop: '1px solid var(--navy-pale)',
              paddingTop: '2.5rem'
            }}>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Need to perform ITR e-filing, check return processing status, or verify tax statements?
              </p>
              <a
                href="https://www.incometax.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-navy"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Visit the Official Income Tax Portal (incometax.gov.in)
                <ArrowRight size={14} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Enquire Now full-width strip */}
      <section className="bg-light" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            backgroundColor: 'var(--bg-white)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--navy-pale)',
            boxShadow: 'var(--shadow-md)',
            padding: '2.5rem 3rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                <MessageSquare size={20} color="var(--orange)" />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--orange)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Free Consultation
                </span>
              </div>
              <h3 style={{ fontSize: '1.4rem', margin: 0, color: 'var(--navy)' }}>
                Have a question about {category.title}?
              </h3>
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                Our experts are ready to help — reach out and we'll respond within 24 hours.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/request-service" className="btn btn-orange">
                Enquire Now <ArrowRight size={15} />
              </Link>
              <Link to="/services" className="btn btn-ghost-navy" style={{ fontSize: '0.88rem' }}>
                ← All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other categories quick-nav */}
      <section style={{ padding: '4rem 0 5rem' }}>
        <div className="container">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1.5rem' }}>
            Explore Other Service Categories
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {serviceCategories
              .filter(c => c.slug !== category.slug)
              .map(c => (
                <Link
                  key={c.slug}
                  to={`/services/${c.slug}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '0.65rem 1.25rem',
                    borderRadius: 'var(--radius-pill)',
                    border: '1.5px solid var(--navy-pale)',
                    backgroundColor: 'var(--bg-white)',
                    color: 'var(--navy)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = c.color;
                    e.currentTarget.style.backgroundColor = c.color + '10';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--navy-pale)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-white)';
                  }}
                >
                  <span>{c.icon}</span>
                  {c.title}
                  <ArrowRight size={13} />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <DiagonalBanner variant="navy">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
          <h2 style={{ color: 'var(--bg-white)', margin: 0 }}>Ready to Get Started?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '560px', fontSize: '1.05rem', margin: 0 }}>
            Fill out our quick enquiry form and our team will get back to you within 24 hours with a tailored proposal.
          </p>
          <Link to="/request-service" className="btn btn-orange">
            Request a Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </DiagonalBanner>
    </div>
  );
}
