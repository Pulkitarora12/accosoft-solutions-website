import React from 'react';
import { ExternalLink, Calendar, Bell } from 'lucide-react';
import { noticesData } from '../data/notices';

export default function Notices() {
  // Sort notices by date descending (most recent first)
  const sortedNotices = [...noticesData].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section id="notices-section" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-light)', borderTop: '1px solid var(--navy-pale)' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '3.5rem' }}>
          <span style={{
            color: 'var(--orange)', fontWeight: 800, fontSize: '0.85rem',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            display: 'block', marginBottom: '0.75rem'
          }}>
            Official Updates
          </span>
          <h2>Compliance & Portal Notices</h2>
          <p className="lead">
            Latest announcements, deadline extensions, and compliance guidelines compiled directly from official government tax portals.
          </p>
        </div>

        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {sortedNotices.map((notice) => {
            const isGst = notice.source === 'gst';
            const portalName = isGst ? 'GST Portal' : 'ITR Portal';
            const accentColor = isGst ? 'var(--navy)' : 'var(--navy-light)';
            
            return (
              <div
                key={notice.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  padding: '2rem',
                  borderTop: `4px solid ${notice.important ? 'var(--orange)' : accentColor}`,
                  backgroundColor: 'var(--bg-white)',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative'
                }}
              >
                {/* Important Ribbon Badge */}
                {notice.important && (
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(245, 130, 31, 0.12)',
                    color: 'var(--orange)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.65rem',
                    borderRadius: 'var(--radius-pill)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Bell size={10} />
                    Important
                  </span>
                )}

                {/* Date and Source Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem', color: 'var(--text-light)', fontSize: '0.8rem', fontWeight: 600 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} />
                    {notice.date}
                  </span>
                  <span style={{
                    backgroundColor: 'var(--navy-pale)',
                    color: 'var(--navy)',
                    padding: '0.15rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}>
                    {portalName}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  marginBottom: '0.85rem',
                  lineHeight: 1.4
                }}>
                  {notice.title}
                </h3>

                {/* Summary */}
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-mid)',
                  lineHeight: 1.6,
                  flexGrow: 1,
                  marginBottom: '1.75rem'
                }}>
                  {notice.summary}
                </p>

                {/* Portal Link */}
                <a
                  href={notice.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost-navy"
                  style={{
                    fontSize: '0.82rem',
                    padding: '0.55rem 1.1rem',
                    alignSelf: 'flex-start',
                    gap: '6px',
                    borderWidth: '1.5px'
                  }}
                >
                  Read more on {portalName}
                  <ExternalLink size={13} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
