import React from 'react';

export default function LogoMarquee() {
  const clients = [
    { logo: '/images/clients/being_ghumakkad.png', label: 'Being Ghumakkad' },
    { logo: '/images/clients/dharm_gyan.png', label: 'Dharm Gyan' },
    { logo: '/images/clients/nmf_news.png', label: 'NMF News' },
    { logo: '/images/clients/india_news.png', label: 'India News' },
    { logo: '/images/clients/sports_hour.png', label: 'Sports Hour' },
    { logo: '/images/clients/sram_india.jpg', label: 'Sram India Ayush', clip: 'circle(46% at 50% 50%)' },
    { logo: '/images/clients/podcast_wala.jpg', label: 'Podcast Wala', clip: 'circle(48% at 50% 50%)' },
    { logo: '/images/clients/news_tank.jpg', label: 'News Tank', clip: 'circle(46% at 50% 50%)' },
    { logo: '/images/clients/accounts_bureau.png', label: 'Accounts Bureau' }
  ];

  // Double the list for infinite scroll continuity
  const marqueeItems = [...clients, ...clients];

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-white)',
        padding: '3rem 0',
        borderBottom: '1px solid var(--navy-pale)',
        borderTop: '1px solid var(--navy-pale)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div className="container" style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--text-light)'
          }}
        >
          Trusted by Industry Leaders and Growing Businesses
        </span>
      </div>

      <div
        className="marquee-container"
        style={{
          display: 'flex',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          padding: '0.75rem 0'
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            gap: '2.5rem',
            width: 'max-content',
            animation: 'scrollMarquee 25s linear infinite'
          }}
        >
          {marqueeItems.map((item, idx) => (
            <div
              key={idx}
              className="marquee-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.25rem 3rem',
                border: '1px solid var(--navy-pale)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-white)',
                minWidth: '280px',
                height: '130px',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.borderColor = 'var(--navy)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.zIndex = '5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = 'var(--navy-pale)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.zIndex = 'auto';
              }}
            >
              <img
                src={item.logo}
                alt={item.label}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  clipPath: item.clip || 'none'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles for keyframe scroll */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 1.25rem));
          }
        }
      `}} />
    </div>
  );
}

