import React from 'react';

export default function DiagonalBanner({ variant = 'navy', children, className = '' }) {
  const isNavy = variant === 'navy';
  const bgColor = isNavy ? 'var(--navy)' : 'var(--bg-light)';
  const textColor = isNavy ? 'var(--bg-white)' : 'var(--text-dark)';

  return (
    <div
      className={`diagonal-banner-wrapper ${className}`}
      style={{
        position: 'relative',
        backgroundColor: bgColor,
        color: textColor,
        padding: '6rem 0',
        marginTop: '-2rem',
        marginBottom: '-2rem',
        zIndex: 5,
        clipPath: 'polygon(0 4%, 100% 0%, 100% 96%, 0% 100%)',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 6 }}>
        {children}
      </div>
    </div>
  );
}
