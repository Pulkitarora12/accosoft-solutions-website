import React from 'react';

export default function Logo({ variant = 'dark', showText = true, size = 48 }) {
  const isDark = variant === 'dark';
  const textColor = isDark ? '#0B2F52' : '#FFFFFF';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <img
        src="/logo.png"
        alt="Accosoft Solutions Logo"
        style={{
          height: `${size}px`,
          width: 'auto',
          objectFit: 'contain'
        }}
      />
      {showText && (
        <div className="logo-text-container">
          <span className="logo-title-text" style={{ color: textColor }}>
            Accosoft Solutions Pvt Ltd
          </span>
        </div>
      )}
    </div>
  );
}
