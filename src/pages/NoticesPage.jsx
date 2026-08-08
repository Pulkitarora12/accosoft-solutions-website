import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, Bell, Search, Filter } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { noticesData } from '../data/notices';
import { logSearchQuery } from '../utils/tracker';

const headerImages = [
  '/images/photo1.jpg',
  '/images/photo2.jpg',
  '/images/photo3.jpg'
];

export default function NoticesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'gst' | 'itr'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Debounce logging of search queries
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const timer = setTimeout(() => {
      logSearchQuery(searchQuery, window.location.pathname + window.location.search);
    }, 1000); // 1s debounce
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Sort notices by date descending (most recent first)
  const sortedNotices = [...noticesData].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Filter based on search query and category tab
  const filteredNotices = sortedNotices.filter((notice) => {
    const matchesTab = activeTab === 'all' || notice.source === activeTab;
    const matchesSearch = 
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div>
      <PageHeader
        title="Official Notifications"
        subtitle="Stay updated with official deadlines, tax portals revisions, and GST compliance circulars."
        images={headerImages}
        breadcrumbs={[{ name: 'Notification', path: '/notification' }]}
      />

      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          
          {/* Filter Bar Controls */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: '3.5rem',
            backgroundColor: 'var(--bg-light)',
            padding: '1.25rem 1.75rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--navy-pale)'
          }} className="notices-filter-bar">
            
            {/* Left: Tab Selectors */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Notices' },
                { id: 'gst', label: 'GST Updates' },
                { id: 'itr', label: 'Income Tax (ITR)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '1.5px solid transparent',
                    backgroundColor: activeTab === tab.id ? 'var(--navy)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--bg-white)' : 'var(--text-light)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.color = 'var(--navy)';
                      e.currentTarget.style.backgroundColor = 'rgba(11, 47, 82, 0.05)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.color = 'var(--text-light)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right: Search Box */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-white)',
              border: '1.5px solid var(--navy-pale)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.4rem 1.25rem',
              width: '100%',
              maxWidth: '320px',
              position: 'relative'
            }} className="notices-search-input">
              <Search size={16} color="var(--text-light)" style={{ marginRight: '8px' }} />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.85rem',
                  color: 'var(--text-dark)',
                  width: '100%'
                }}
              />
            </div>
          </div>

          {/* Notices Grid */}
          {filteredNotices.length > 0 ? (
            <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
              {filteredNotices.map((notice) => {
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
                      position: 'relative',
                      borderLeft: '1px solid var(--navy-pale)',
                      borderRight: '1px solid var(--navy-pale)',
                      borderBottom: '1px solid var(--navy-pale)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden'
                    }}
                  >
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

                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--navy)',
                      marginBottom: '0.85rem',
                      lineHeight: 1.4
                    }}>
                      {notice.title}
                    </h3>

                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-mid)',
                      lineHeight: 1.6,
                      flexGrow: 1,
                      marginBottom: '1.75rem'
                    }}>
                      {notice.summary}
                    </p>

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
          ) : (
            /* Empty State */
            <div style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              backgroundColor: 'var(--bg-light)',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed var(--navy-pale)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                backgroundColor: 'var(--navy-pale)',
                color: 'var(--navy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Filter size={24} />
              </div>
              <h3 style={{ color: 'var(--navy)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>No notices match your criteria</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', margin: 0 }}>
                Try adjusting your search keywords or switching filter tabs to locate official portal announcements.
              </p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
