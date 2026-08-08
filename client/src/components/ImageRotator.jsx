import React, { useState, useEffect, useRef } from 'react';

export default function ImageRotator({
  images = [],
  interval = 4500,
  transitionType = 'crossfade', // default crossfade
  overlay = false,
  overlayOpacity = 0.55,
  aspectRatio = 'auto',
  borderRadius = 'var(--radius-md)',
  cycleOnHover = false,
  className = ''
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (images.length <= 1) return;

    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
    };

    const stopTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };

    if (cycleOnHover) {
      if (isHovered) {
        startTimer();
      } else {
        stopTimer();
      }
    } else {
      startTimer();
    }

    return () => stopTimer();
  }, [images.length, interval, cycleOnHover, isHovered]);

  if (!images || images.length === 0) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          aspectRatio,
          borderRadius,
          backgroundColor: 'var(--navy-pale)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--navy)'
        }}
      >
        No Images Provided
      </div>
    );
  }

  return (
    <div
      className={`image-rotator-container ${className}`}
      onMouseEnter={() => cycleOnHover && setIsHovered(true)}
      onMouseLeave={() => cycleOnHover && setIsHovered(false)}
      style={{
        aspectRatio,
        borderRadius,
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        backgroundColor: '#0F172A' // Dark background under image crossfade
      }}
    >
      {images.map((img, idx) => {
        const src = typeof img === 'string' ? img : img.src;
        const alt = typeof img === 'string' ? 'Accosoft Showcase' : (img.alt || 'Accosoft Showcase');

        return (
          <img
            key={idx}
            src={src}
            alt={alt}
            className="image-rotator-slide"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: idx === activeIndex ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              zIndex: idx === activeIndex ? 1 : 0
            }}
          />
        );
      })}

      {overlay && (
        <div
          className="image-rotator-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--navy)',
            opacity: overlayOpacity,
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />
      )}
    </div>
  );
}
