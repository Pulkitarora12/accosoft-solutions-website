import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DiagonalBanner from '../components/DiagonalBanner';
import { serviceCategories } from '../data/services';

const headerImages = [
  '/images/photo1.jpg',
  '/images/photo2.jpg',
  '/images/photo3.jpg'
];

// Representative preview services shown on each category card
const previewServices = {
  'income-tax': ['ITR e-Filing', 'TDS Return Filing', 'Income Tax Notice Reply', 'Advance Tax'],
  'accounting-auditing': ['Bookkeeping', 'Accounting Services', 'Auditing & Assurance', 'Statutory Audit'],
  'gst': ['GST Registration', 'GST Return Filing', 'GST Audit', 'GST Notice Reply'],
  'business-registration': ['Pvt. Ltd. Company', 'LLP Registration', 'OPC Registration', 'NGO Registration'],
  'other-registration': ['MSME Registration', 'Trademark Registration', 'IEC Registration', 'Startup Service']
};

export default function Services() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive financial, tax, and registration services for businesses across India — from startups to listed enterprises."
        images={headerImages}
        breadcrumbs={[{ name: 'Services', path: '/services' }]}
      />

      {/* Category Cards */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span style={{
              color: 'var(--orange)', fontWeight: 800, fontSize: '0.85rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              display: 'block', marginBottom: '0.75rem'
            }}>
              SERVICE DIVISIONS
            </span>
            <h2>Everything Your Business Needs</h2>
            <p className="lead">
              Choose a category below to explore individual services, pricing, and get started with a consultation.
            </p>
          </div>

          {/* 2×2 grid on desktop, 1-col on mobile, highlighted spans 1/-1 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2.5rem'
          }} className="category-grid">
            {serviceCategories.map((cat) => {
              const isHighlighted = cat.highlighted;
              const hasAccordion = Boolean(cat.subCategories);

              // ── Accordion card for Financial Planning ──────────────────────
              if (hasAccordion) {
                return (
                  <div
                    key={cat.slug}
                    id={`service-card-${cat.slug}`}
                    style={{ gridColumn: 'auto' }}
                  >
                    <div
                      className="card"
                      style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 0,
                        overflow: 'hidden',
                        border: '1px solid var(--navy-pale)',
                        boxShadow: accordionOpen ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {/* Card header band */}
                      <div style={{
                        background: `linear-gradient(135deg, ${cat.color} 0%, ${cat.color}cc 100%)`,
                        padding: '2rem 2rem 1.5rem',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          position: 'absolute', right: '-30px', top: '-30px',
                          width: '120px', height: '120px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255,255,255,0.07)'
                        }} />
                        <div style={{
                          position: 'absolute', right: '20px', bottom: '-20px',
                          width: '80px', height: '80px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255,255,255,0.05)'
                        }} />
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{cat.icon}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <h3 style={{
                            color: '#fff', fontSize: '1.4rem', fontWeight: 800,
                            margin: 0, lineHeight: 1.2
                          }}>
                            {cat.title}
                          </h3>
                        </div>
                        <span style={{
                          display: 'inline-block',
                          marginTop: '0.5rem',
                          backgroundColor: 'rgba(255,255,255,0.18)',
                          color: '#fff',
                          fontSize: '0.75rem', fontWeight: 600,
                          padding: '0.2rem 0.65rem',
                          borderRadius: '999px'
                        }}>
                          {cat.services.length} services
                        </span>
                      </div>

                      {/* Card body: collapsed teaser + toggle */}
                      <div style={{ padding: '1.75rem 2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <p style={{
                          color: 'var(--text-mid)', fontSize: '0.9rem',
                          lineHeight: 1.65, marginBottom: '1.25rem'
                        }}>
                          {cat.description}
                        </p>

                        {/* Accordion toggle button */}
                        <button
                          id={`accordion-toggle-${cat.slug}`}
                          onClick={() => setAccordionOpen(o => !o)}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            color: 'var(--navy)', fontWeight: 700, fontSize: '0.88rem',
                            background: 'none', border: 'none', cursor: 'pointer',
                            padding: 0, marginBottom: accordionOpen ? '1.25rem' : 0,
                            transition: 'color 0.2s ease'
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = cat.color}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--navy)'}
                          aria-expanded={accordionOpen}
                        >
                          {accordionOpen ? 'Hide details' : 'View details'}
                          <ChevronDown
                            size={16}
                            style={{
                              transform: accordionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s ease'
                            }}
                          />
                        </button>

                        {/* Accordion expanded content */}
                        <div
                          id={`accordion-content-${cat.slug}`}
                          style={{
                            maxHeight: accordionOpen ? '600px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.4s ease',
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '0.5rem' }}>
                            {cat.subCategories.map((sub, si) => (
                              <div key={si}>
                                <p style={{
                                  fontWeight: 700, fontSize: '0.85rem', color: 'var(--navy)',
                                  textTransform: 'uppercase', letterSpacing: '0.06em',
                                  marginBottom: '0.5rem'
                                }}>
                                  {sub.name}
                                </p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                  {sub.items.map((item, ii) => (
                                    <li key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                                      <span style={{
                                        width: '6px', height: '6px', borderRadius: '50%',
                                        backgroundColor: cat.color, flexShrink: 0, marginTop: '5px'
                                      }} />
                                      <span>
                                        <span style={{ fontWeight: 600, color: 'var(--text-mid)' }}>{item.name}</span>
                                        {' — '}{item.description}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // ── Standard navigable category card ─────────────────────────
              return (
                <Link
                  key={cat.slug}
                  to={`/services/${cat.slug}`}
                  style={{
                    textDecoration: 'none',
                    gridColumn: isHighlighted ? '1 / -1' : 'auto'
                  }}
                >
                  <div
                    className="card"
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 0,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: isHighlighted ? '2px solid var(--orange)' : '1px solid var(--navy-pale)',
                      boxShadow: isHighlighted ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {/* Card header band */}
                    <div style={{
                      background: isHighlighted 
                        ? 'linear-gradient(135deg, var(--orange) 0%, var(--orange-hover) 100%)'
                        : `linear-gradient(135deg, ${cat.color} 0%, ${cat.color}cc 100%)`,
                      padding: isHighlighted ? '2.5rem 2.5rem 1.75rem' : '2rem 2rem 1.5rem',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Decorative circle */}
                      <div style={{
                        position: 'absolute', right: '-30px', top: '-30px',
                        width: '120px', height: '120px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.07)'
                      }} />
                      <div style={{
                        position: 'absolute', right: '20px', bottom: '-20px',
                        width: '80px', height: '80px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.05)'
                      }} />

                      <div style={{ fontSize: isHighlighted ? '3rem' : '2.5rem', marginBottom: '0.75rem' }}>{cat.icon}</div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <h3 style={{
                          color: '#fff', fontSize: isHighlighted ? '1.6rem' : '1.4rem', fontWeight: 800,
                          margin: 0, lineHeight: 1.2
                        }}>
                          {cat.title}
                        </h3>
                        {isHighlighted && (
                          <span style={{
                            backgroundColor: '#fff',
                            color: 'var(--orange)',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '0.15rem 0.6rem',
                            borderRadius: '999px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            Accosoft Core Focus
                          </span>
                        )}
                      </div>

                      <span style={{
                        display: 'inline-block',
                        marginTop: '0.5rem',
                        backgroundColor: 'rgba(255,255,255,0.18)',
                        color: '#fff',
                        fontSize: '0.75rem', fontWeight: 600,
                        padding: '0.2rem 0.65rem',
                        borderRadius: '999px'
                      }}>
                        {cat.services.length} services
                      </span>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: isHighlighted ? '2.25rem 2.5rem' : '1.75rem 2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <p style={{
                        color: 'var(--text-mid)', fontSize: isHighlighted ? '0.98rem' : '0.9rem',
                        lineHeight: 1.65, marginBottom: '1.25rem'
                      }}>
                        {cat.description}
                      </p>

                      {/* Preview list */}
                      <ul style={{ 
                        listStyle: 'none', 
                        display: 'grid', 
                        gridTemplateColumns: isHighlighted ? 'repeat(2, 1fr)' : '1fr',
                        gap: '0.45rem', 
                        marginBottom: '1.5rem', 
                        flexGrow: 1 
                      }} className="cat-preview-list">
                        {(previewServices[cat.slug] || cat.services.slice(0, 4).map(s => s.name)).map((name, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                            <span style={{
                              width: '6px', height: '6px', borderRadius: '50%',
                              backgroundColor: isHighlighted ? 'var(--orange)' : cat.color, flexShrink: 0
                            }} />
                            {name}
                          </li>
                        ))}
                        <li style={{ 
                          fontSize: '0.8rem', 
                          color: isHighlighted ? 'var(--orange)' : 'var(--navy)', 
                          fontWeight: 600, 
                          marginTop: '0.25rem',
                          gridColumn: isHighlighted ? 'span 2' : 'auto'
                        }}>
                          + {cat.services.length - 4} more…
                        </li>
                      </ul>

                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        color: isHighlighted ? 'var(--orange)' : 'var(--navy)', fontWeight: 700, fontSize: '0.88rem',
                        marginTop: 'auto'
                      }}>
                        Explore all {cat.title} services <ArrowRight size={15} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Accosoft strip */}
      <section className="bg-light" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span style={{
              color: 'var(--orange)', fontWeight: 800, fontSize: '0.85rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              display: 'block', marginBottom: '0.75rem'
            }}>
              WHY CHOOSE US
            </span>
            <h2>Built for Indian Businesses</h2>
            <p className="lead">Every service is delivered by qualified professionals with a deep understanding of Indian tax laws and compliance requirements.</p>
          </div>

          <div className="grid-3">
            {[
              { icon: '⚡', title: 'Fast Turnaround', desc: 'Most registrations and filings completed within 3–7 business days.' },
              { icon: '🛡️', title: 'Zero Penalty Guarantee', desc: 'Meticulous verification ensures error-free submissions every time.' },
              { icon: '🤝', title: 'Dedicated Support', desc: 'A personal account manager handles every step of your compliance journey.' },
              { icon: '📊', title: 'Transparent Pricing', desc: 'Fixed-fee packages with no hidden charges or surprise billing.' },
              { icon: '🇮🇳', title: 'Pan-India Coverage', desc: 'Serving businesses in Delhi, Bihar, and all Indian states remotely.' },
              { icon: '🔒', title: 'Secure & Confidential', desc: 'Your financial data is handled with bank-grade confidentiality.' }
            ].map((item, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <DiagonalBanner variant="navy">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
          <h2 style={{ color: 'var(--bg-white)', margin: 0 }}>Not Sure Where to Start?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '580px', fontSize: '1.05rem', margin: 0 }}>
            Book a free 15-minute consultation with our experts. We'll identify the right compliance package for your business.
          </p>
          <Link to="/request-service" className="btn btn-orange">
            Book Free Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </DiagonalBanner>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .category-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}
