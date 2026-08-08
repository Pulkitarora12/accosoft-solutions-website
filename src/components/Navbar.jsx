import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { serviceCategories } from '../data/services';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  };

  const handleContactClick = (e, path) => {
    if (path === '#contact-info') {
      e.preventDefault();
      closeMenu();
      const el = document.getElementById('footer-contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      closeMenu();
    }
  };

  // Non-services nav links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Notification', path: '/notification' },
    { name: 'Careers', path: '/careers' },
    { name: 'Request Service', path: '/request-service' },
    { name: 'Contact', path: '#contact-info' }
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        backgroundColor: 'var(--bg-white)',
        boxShadow: isScrolled ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        borderBottom: '1px solid var(--navy-pale)',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div className="container" style={{ padding: '0.75rem 1.5rem' }}>
        {/* Desktop: Logo row */}
        <div
          className="desktop-only"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid var(--navy-pale)'
          }}
        >
          <Logo variant="dark" size={90} showText={true} />
          <span style={{
            fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 700,
            letterSpacing: '0.12em', marginTop: '6px', textTransform: 'uppercase'
          }}>
            ✦ Professional Accounting, Audit & Software Solutions ✦
          </span>
        </div>

        {/* Desktop: Navigation row */}
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '0.75rem' }}>
          {/* Mobile: Logo + hamburger */}
          <div
            className="mobile-header"
            style={{ display: 'none', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Link to="/" onClick={closeMenu}>
              <Logo variant="dark" size={60} showText={true} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={isOpen}
              style={{ background: 'none', border: 'none', color: 'var(--navy)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0.25rem' }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop nav links */}
          <div
            className="desktop-only"
            style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}
          >
            {/* Home */}
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              style={{ fontSize: '1.05rem', fontWeight: isActive('/') ? '800' : '700', color: 'var(--navy)' }}
            >
              Home
            </Link>

            {/* Services mega-menu trigger */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setServicesOpen(v => !v)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  fontSize: '1.05rem', fontWeight: isActive('/services') ? '800' : '700',
                  color: isActive('/services') ? 'var(--navy)' : 'var(--navy)',
                  padding: '0.5rem 0',
                  position: 'relative',
                  fontFamily: 'inherit'
                }}
                className={`nav-link ${isActive('/services') ? 'active' : ''}`}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
              >
                Services
                <ChevronDown
                  size={14}
                  style={{ transition: 'transform 0.2s', transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {/* Mega-menu dropdown */}
              {servicesOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '920px',
                    backgroundColor: 'var(--bg-white)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 20px 60px rgba(11,47,82,0.18)',
                    border: '1px solid var(--navy-pale)',
                    zIndex: 300,
                    overflow: 'hidden',
                    animation: 'fadeInDown 0.18s ease'
                  }}
                >
                  {/* Top bar */}
                  <div style={{
                    background: 'linear-gradient(90deg, var(--navy) 0%, var(--navy-mid) 100%)',
                    padding: '0.9rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      All Service Categories
                    </span>
                    <Link
                      to="/services"
                      onClick={() => setServicesOpen(false)}
                      style={{ color: 'var(--orange)', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      View All <ArrowRight size={12} />
                    </Link>
                  </div>

                  {/* 5-column grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0 }}>
                    {serviceCategories.map((cat, i) => (
                      <div
                        key={cat.slug}
                        style={{
                          padding: '1.25rem 0.75rem',
                          borderRight: i < 4 ? '1px solid var(--navy-pale)' : 'none',
                          borderBottom: 'none'
                        }}
                      >
                        {/* Category header link */}
                        <Link
                          to={`/services/${cat.slug}`}
                          onClick={() => setServicesOpen(false)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            color: 'var(--navy)', fontWeight: 800, fontSize: '0.78rem',
                            textTransform: 'uppercase', letterSpacing: '0.05em',
                            marginBottom: '0.75rem', textDecoration: 'none',
                            paddingBottom: '0.5rem',
                            borderBottom: `2px solid ${cat.color}`
                          }}
                        >
                          <span style={{ fontSize: '0.95rem' }}>{cat.icon}</span>
                          {cat.shortTitle}
                        </Link>

                        {/* Service sub-links */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          {cat.services.slice(0, 6).map(svc => (
                            <Link
                              key={svc.id}
                              to={`/services/${cat.slug}#${svc.id}`}
                              onClick={() => setServicesOpen(false)}
                              style={{
                                color: 'var(--text-mid)',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                padding: '0.2rem 0',
                                transition: 'color 0.15s',
                                textDecoration: 'none',
                                lineHeight: 1.4
                              }}
                              onMouseEnter={e => e.currentTarget.style.color = cat.color}
                              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-mid)'}
                            >
                              {svc.name}
                            </Link>
                          ))}
                          {cat.services.length > 6 && (
                            <Link
                              to={`/services/${cat.slug}`}
                              onClick={() => setServicesOpen(false)}
                              style={{
                                color: 'var(--orange)', fontSize: '0.72rem',
                                fontWeight: 700, marginTop: '0.25rem',
                                textDecoration: 'none'
                              }}
                            >
                              +{cat.services.length - 6} more →
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom quick-link bar */}
                  <div style={{
                    borderTop: '1px solid var(--navy-pale)',
                    padding: '0.85rem 1.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: 'var(--bg-light)'
                  }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                      {serviceCategories.reduce((a, c) => a + c.services.length, 0)} services available across 5 categories
                    </span>
                    <Link
                      to="/request-service"
                      onClick={() => setServicesOpen(false)}
                      className="btn btn-orange"
                      style={{ fontSize: '0.78rem', padding: '0.4rem 1rem', gap: '4px' }}
                    >
                      Enquire Now <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Remaining nav links */}
            {navLinks.slice(1).map((link) => {
              const active = isActive(link.path);
              const isScrollLink = link.path.startsWith('#');
              return isScrollLink ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleContactClick(e, link.path)}
                  className="nav-link"
                  style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)' }}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link ${active ? 'active' : ''}`}
                  style={{ fontSize: '1.05rem', fontWeight: active ? '800' : '700', color: 'var(--navy)' }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Drawer */}
        {isOpen && (
          <div
            className="mobile-only"
            style={{
              position: 'absolute', top: '100%', left: 0,
              width: '100%', backgroundColor: 'var(--bg-white)',
              borderBottom: '2px solid var(--navy)',
              boxShadow: 'var(--shadow-lg)',
              padding: '1.5rem',
              display: 'flex', flexDirection: 'column', gap: '1rem',
              animation: 'fadeIn var(--transition-fast) forwards',
              maxHeight: 'calc(100vh - 80px)',
              overflowY: 'auto',
              zIndex: 250
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)', borderBottom: '1px solid var(--navy-pale)', paddingBottom: '0.25rem' }}>
                Navigation
              </span>

              {/* Home */}
              <Link
                to="/"
                onClick={closeMenu}
                style={{ padding: '0.5rem 0', fontSize: '1rem', fontWeight: isActive('/') ? '700' : '600', color: isActive('/') ? 'var(--orange)' : 'var(--navy)', borderBottom: '1px dashed var(--navy-pale)' }}
              >
                Home
              </Link>

              {/* Services accordion in mobile */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(v => !v)}
                  style={{
                    width: '100%', background: 'none', border: 'none',
                    padding: '0.5rem 0', fontSize: '1rem', fontWeight: '600',
                    color: isActive('/services') ? 'var(--orange)' : 'var(--navy)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    borderBottom: '1px dashed var(--navy-pale)',
                    cursor: 'pointer', fontFamily: 'inherit'
                  }}
                >
                  Services
                  <ChevronDown size={16} style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }} />
                </button>

                {mobileServicesOpen && (
                  <div style={{ paddingTop: '0.75rem', paddingLeft: '0.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link
                      to="/services"
                      onClick={closeMenu}
                      style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <ArrowRight size={13} /> View All Services
                    </Link>
                    {serviceCategories.map(cat => (
                      <div key={cat.slug}>
                        <Link
                          to={`/services/${cat.slug}`}
                          onClick={closeMenu}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            fontSize: '0.88rem', fontWeight: 700,
                            color: cat.color, marginBottom: '0.4rem'
                          }}
                        >
                          {cat.icon} {cat.title}
                        </Link>
                        <div style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          {cat.services.map(svc => (
                            <Link
                              key={svc.id}
                              to={`/services/${cat.slug}`}
                              onClick={closeMenu}
                              style={{ fontSize: '0.8rem', color: 'var(--text-mid)', fontWeight: 500 }}
                            >
                              • {svc.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Remaining links */}
              {navLinks.slice(1).map((link) => {
                const active = isActive(link.path);
                const isScrollLink = link.path.startsWith('#');
                return isScrollLink ? (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleContactClick(e, link.path)}
                    style={{ padding: '0.5rem 0', fontSize: '1rem', fontWeight: 600, color: 'var(--navy)', borderBottom: '1px dashed var(--navy-pale)' }}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={closeMenu}
                    style={{ padding: '0.5rem 0', fontSize: '1rem', fontWeight: active ? '700' : '600', color: active ? 'var(--orange)' : 'var(--navy)', borderBottom: '1px dashed var(--navy-pale)' }}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-header { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}} />
    </header>
  );
}
