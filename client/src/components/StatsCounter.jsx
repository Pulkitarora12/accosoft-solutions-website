import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';

// Single stat component to manage count state individually
function StatItem({ iconName, targetValue, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const Icon = Icons[iconName] || Icons.TrendingUp;

  useEffect(() => {
    let observer;
    let startTimestamp = null;
    const duration = 2000; // 2 seconds animation
    let isCurrentlyIntersecting = false;
    let animationFrameId = null;

    const animateCount = (timestamp) => {
      if (!isCurrentlyIntersecting) return; // Stop if scrolled out

      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Calculate active count
      const currentValue = Math.floor(progress * targetValue);
      setCount(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCount(targetValue); // guarantee target is hit
      }
    };

    if (elementRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!isCurrentlyIntersecting) {
                isCurrentlyIntersecting = true;
                startTimestamp = null; // fresh startTimestamp on each re-entry
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
                animationFrameId = requestAnimationFrame(animateCount);
              }
            } else {
              isCurrentlyIntersecting = false;
              if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
              }
              startTimestamp = null;
              setCount(0); // reset count to 0 when scrolled out
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(elementRef.current);
    }

    return () => {
      if (observer && elementRef.current) {
        observer.disconnect();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetValue]);

  return (
    <div
      ref={elementRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1.5rem',
        backgroundColor: 'var(--bg-white)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--navy-pale)',
        transition: 'transform var(--transition-normal)'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div
        style={{
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          backgroundColor: 'var(--navy-pale)',
          color: 'var(--navy)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem'
        }}
      >
        <Icon size={24} />
      </div>
      <span
        style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: 'var(--orange)',
          lineHeight: '1.1',
          marginBottom: '0.25rem'
        }}
      >
        {count}
        {suffix}
      </span>
      <span
        style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'var(--text-mid)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function StatsCounter({ stats }) {
  // Default stats fallback if none are provided
  const defaultStats = [
    { iconName: 'Users', targetValue: 450, suffix: '+', label: 'Satisfied Clients' },
    { iconName: 'Award', targetValue: 30, suffix: '+', label: 'Years of Team Experience' },
    { iconName: 'Briefcase', targetValue: 12, suffix: '+', label: 'Services Offered' },
    { iconName: 'Percent', targetValue: 99, suffix: '%', label: 'Retention Rate' }
  ];

  const activeStats = stats || defaultStats;

  return (
    <div className="grid-4" style={{ margin: '2rem 0' }}>
      {activeStats.map((stat, idx) => (
        <StatItem
          key={idx}
          iconName={stat.iconName}
          targetValue={stat.targetValue}
          suffix={stat.suffix}
          label={stat.label}
        />
      ))}
    </div>
  );
}
