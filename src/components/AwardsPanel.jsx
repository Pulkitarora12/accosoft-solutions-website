import React from 'react';

export default function AwardsPanel() {
  return (
    <div style={{ width: '100%' }}>

      {/* Light-gray panel */}
      <div style={{ backgroundColor: 'var(--bg-light)', padding: '4rem 0', borderBottom: '1px solid var(--navy-pale)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2.5rem',
              textAlign: 'center'
            }}
            className="grid-3"
          >
            <div>
              <h4 style={{ color: 'var(--navy)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Top SME Partner (Delhi)</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: 0 }}>Awarded for excellence in ERP systems deployment among North Delhi commercial hubs.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--navy)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Tax Compliance Excellence</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: 0 }}>Recognized for assisting over 150+ startup firms with error-free GST filing operations.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--navy)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Clutch Highly Rated</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: 0 }}>Ranked in top 10 local financial consultants for customer support responsiveness.</p>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .footer-columns {
            gap: 1.5rem !important;
          }
        }
      `}} />
    </div>
  );
}
