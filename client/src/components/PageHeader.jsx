import React from 'react';
import ImageRotator from './ImageRotator';
import { Link } from 'react-router-dom';

export default function PageHeader({ title, subtitle, images = [], breadcrumbs = [] }) {
  // Pinned Unsplash image list for page headers if none provided
  const fallbackImages = [
    '/images/photo1.jpg',
    '/images/photo2.jpg',
    '/images/photo4.jpg',
    '/images/photo5.jpg'
  ];

  const headerImages = images.length > 0 ? images : fallbackImages;

  return (
    <div
      style={{
        position: 'relative',
        height: '320px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--bg-white)',
        textAlign: 'center'
      }}
    >
      {/* Background Slideshow */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <ImageRotator
          images={headerImages}
          interval={5000}
          overlay={true}
          overlayOpacity={0.65}
          borderRadius="0"
        />
      </div>

      {/* Header Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          animation: 'fadeIn 0.8s ease-out'
        }}
      >
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              backgroundColor: 'rgba(11, 47, 82, 0.5)',
              padding: '0.35rem 1rem',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
          >
            <Link to="/" style={{ color: 'rgba(255, 255, 255, 0.8)' }} onMouseEnter={(e) => e.target.style.color = 'var(--orange)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>
              Home
            </Link>
            {breadcrumbs.map((bc, idx) => (
              <React.Fragment key={idx}>
                <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>/</span>
                {bc.path ? (
                  <Link to={bc.path} style={{ color: 'rgba(255, 255, 255, 0.8)' }} onMouseEnter={(e) => e.target.style.color = 'var(--orange)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>
                    {bc.name}
                  </Link>
                ) : (
                  <span style={{ color: 'var(--orange)', fontWeight: 600 }}>{bc.name}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <h1
          style={{
            fontSize: '2.5rem',
            color: 'var(--bg-white)',
            marginBottom: '0.25rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            fontWeight: 800
          }}
        >
          {title}
        </h1>
        
        {subtitle && (
          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.9)',
              margin: 0,
              maxWidth: '600px',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              fontWeight: 500
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
