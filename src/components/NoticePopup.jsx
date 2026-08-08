import React, { useState, useEffect } from 'react';
import { X, ExternalLink, AlertCircle } from 'lucide-react';
import { noticesData } from '../data/notices';

export default function NoticePopup() {
  const [activeNotice, setActiveNotice] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 1. Filter notices marked as important
    const importantNotices = noticesData.filter(n => n.important);
    if (importantNotices.length === 0) return;

    // 2. Sort to find the most recent one
    const sorted = [...importantNotices].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestNotice = sorted[0];

    // 3. Check if this notice was already dismissed
    const dismissedIds = JSON.parse(localStorage.getItem('accosoft_dismissed_notices') || '[]');
    if (dismissedIds.includes(latestNotice.id)) return;

    // 4. Set active notice and slide it in after a short delay
    setActiveNotice(latestNotice);
    const timer = setTimeout(() => setVisible(true), 1500); // 1.5s delay for premium transition
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    if (!activeNotice) return;

    // 1. Add ID to dismissed list in localStorage
    const dismissedIds = JSON.parse(localStorage.getItem('accosoft_dismissed_notices') || '[]');
    if (!dismissedIds.includes(activeNotice.id)) {
      dismissedIds.push(activeNotice.id);
      localStorage.setItem('accosoft_dismissed_notices', JSON.stringify(dismissedIds));
    }

    // 2. Hide banner
    setVisible(false);
  };

  if (!activeNotice || !visible) return null;

  const isGst = activeNotice.source === 'gst';
  const portalName = isGst ? 'gst.gov.in' : 'incometax.gov.in';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '380px',
        maxWidth: 'calc(100vw - 48px)',
        backgroundColor: 'var(--bg-white)',
        border: '1.5px solid var(--orange)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        padding: '1.5rem',
        zIndex: 9999,
        animation: 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem'
      }}
      className="notice-popup-toast"
    >
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={18} style={{ color: 'var(--orange)', flexShrink: 0 }} />
          <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--orange)' }}>
            Important Update
          </span>
        </div>
        <button
          onClick={handleDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-light)',
            cursor: 'pointer',
            padding: '2px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-light)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          aria-label="Dismiss notice"
        >
          <X size={16} />
        </button>
      </div>

      {/* Notice Details */}
      <div>
        <h4 style={{
          fontSize: '0.95rem',
          fontWeight: 700,
          color: 'var(--navy)',
          margin: '0 0 0.35rem 0',
          lineHeight: 1.35
        }}>
          {activeNotice.title}
        </h4>
        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-mid)',
          lineHeight: 1.5,
          margin: 0
        }}>
          {activeNotice.summary}
        </p>
      </div>

      {/* Outbound Link */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--navy-pale)', paddingTop: '0.85rem', marginTop: '0.25rem' }}>
        <a
          href={activeNotice.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDismiss}
          className="btn btn-orange"
          style={{
            fontSize: '0.78rem',
            padding: '0.45rem 1rem',
            borderRadius: 'var(--radius-sm)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          Verify on {portalName}
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Keyframe slide in animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideInRight {
          from {
            transform: translateX(120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}} />
    </div>
  );
}
