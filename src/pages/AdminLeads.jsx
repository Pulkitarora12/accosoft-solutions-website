import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, EyeOff, Calendar, Phone, Mail, FileText, Search, LogOut } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export default function AdminLeads() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('accosoft_admin_token') || '');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [expandedLeadId, setExpandedLeadId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) {
      fetchLeads();
    }
  }, [token]);

  const fetchLeads = () => {
    setLoading(true);
    setFetchError('');
    fetch('/api/leads', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      if (res.status === 401 || res.status === 403) {
        // Token expired or invalid
        handleLogout();
        throw new Error('Session expired. Please log in again.');
      }
      if (!res.ok) throw new Error('Failed to fetch leads');
      return res.json();
    })
    .then((data) => {
      setLeads(data);
      setLoading(false);
    })
    .catch((err) => {
      setFetchError(err.message);
      setLoading(false);
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Incorrect password');
      }
      return res.json();
    })
    .then((data) => {
      localStorage.setItem('accosoft_admin_token', data.token);
      setToken(data.token);
      setLoading(false);
      setPassword('');
    })
    .catch((err) => {
      setLoginError(err.message);
      setLoading(false);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('accosoft_admin_token');
    setToken('');
    setLeads([]);
  };

  const toggleExpandLead = (id) => {
    setExpandedLeadId(expandedLeadId === id ? null : id);
  };

  return (
    <div>
      <PageHeader
        title="Admin Portal"
        subtitle="Manage incoming corporate leads and evaluate visitor journeys."
        breadcrumbs={[{ name: 'Admin Dashboard', path: '/admin' }]}
      />

      <section style={{ padding: '5rem 0', minHeight: '60vh', backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          {!token ? (
            /* Login View */
            <div
              style={{
                maxWidth: '420px',
                margin: '0 auto',
                backgroundColor: 'var(--bg-white)',
                border: '1px solid var(--navy-pale)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(11, 47, 82, 0.08)',
                    color: 'var(--navy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto'
                  }}
                >
                  <Shield size={24} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--navy)' }}>Admin Log In</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '4px', marginBottom: 0 }}>
                  Enter administrative password to view captured leads.
                </p>
              </div>

              {loginError && (
                <div
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: '1.5px solid red',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    color: 'red',
                    fontSize: '0.8rem',
                    textAlign: 'center'
                  }}
                  role="alert"
                >
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label htmlFor="adminPassword" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}>
                    Dashboard Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="adminPassword"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{
                        width: '100%',
                        padding: '0.65rem 2.5rem 0.65rem 1rem',
                        border: '1.5px solid var(--navy-pale)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-light)',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-orange"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.75 : 1
                  }}
                >
                  <Lock size={15} />
                  {loading ? 'Authenticating...' : 'Access Dashboard'}
                </button>
              </form>
            </div>
          ) : (
            /* Leads Dashboard View */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Toolbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, color: 'var(--navy)', fontSize: '1.5rem' }}>Captured Business Leads</h3>
                  <p style={{ margin: '4px 0 0 0', color: 'var(--text-light)', fontSize: '0.85rem' }}>
                    Verify leads, contact details, and their pre-submission intent journeys.
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-navy"
                  style={{
                    padding: '0.5rem 1.25rem',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <LogOut size={14} />
                  Log Out
                </button>
              </div>

              {fetchError && (
                <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.15)', borderLeft: '4px solid red', color: 'red', borderRadius: 'var(--radius-sm)' }}>
                  Error loading dashboard: {fetchError}. <button onClick={fetchLeads} style={{ textDecoration: 'underline', background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontWeight: 'bold' }}>Retry</button>
                </div>
              )}

              {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-light)' }}>
                  Loading leads... Please wait.
                </div>
              ) : leads.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'var(--bg-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--navy-pale)' }}>
                  <FileText size={48} style={{ color: 'var(--text-light)', marginBottom: '1rem' }} />
                  <h4 style={{ color: 'var(--navy)', margin: 0 }}>No Leads Captured Yet</h4>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginTop: '8px' }}>
                    Leads will display here once visitors submit the roadmap popup form.
                  </p>
                </div>
              ) : (
                /* Leads Table & Expander List */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {leads.map((lead) => {
                    const isExpanded = expandedLeadId === lead.id;
                    return (
                      <div
                        key={lead.id}
                        style={{
                          backgroundColor: 'var(--bg-white)',
                          border: isExpanded ? '1.5px solid var(--orange)' : '1.5px solid var(--navy-pale)',
                          borderRadius: 'var(--radius-md)',
                          boxShadow: 'var(--shadow-sm)',
                          overflow: 'hidden',
                          transition: 'all 0.2s ease-out'
                        }}
                      >
                        {/* Summary Header */}
                        <div
                          onClick={() => toggleExpandLead(lead.id)}
                          style={{
                            padding: '1.5rem',
                            cursor: 'pointer',
                            display: 'grid',
                            gridTemplateColumns: '1.5fr 1.5fr 1.2fr 1fr 0.5fr',
                            alignItems: 'center',
                            gap: '1rem'
                          }}
                        >
                          <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.95rem' }}>
                            {lead.name}
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-mid)' }}>
                            <Mail size={14} style={{ color: 'var(--orange)' }} />
                            <span>{lead.email}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-mid)' }}>
                            <Phone size={14} style={{ color: 'var(--orange)' }} />
                            <span>{lead.phone}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                            <Calendar size={14} />
                            <span>{new Date(lead.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                          </div>

                          <div style={{ textAlign: 'right', fontSize: '0.82rem', fontWeight: 700, color: 'var(--orange)' }}>
                            {isExpanded ? 'Hide Info ▲' : 'View Info ▼'}
                          </div>
                        </div>

                        {/* Expanded Drawer */}
                        {isExpanded && (
                          <div
                            style={{
                              padding: '2rem',
                              borderTop: '1px solid var(--navy-pale)',
                              backgroundColor: 'rgba(245, 130, 31, 0.02)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1.5rem'
                            }}
                          >
                            {/* Message / Requirement */}
                            <div>
                              <h4 style={{ color: 'var(--navy)', fontSize: '0.9rem', margin: '0 0 6px 0', borderBottom: '1px solid var(--navy-pale)', paddingBottom: '4px' }}>
                                Inquiry Details:
                              </h4>
                              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-mid)', lineHeight: 1.5, fontStyle: lead.message ? 'normal' : 'italic' }}>
                                {lead.message || 'No custom requirement message left.'}
                              </p>
                            </div>

                            {/* Session Information */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }} className="grid-2">
                              
                              {/* Page Visit History */}
                              <div>
                                <h4 style={{ color: 'var(--navy)', fontSize: '0.9rem', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <FileText size={15} style={{ color: 'var(--orange)' }} />
                                  Pages Viewed ({lead.pageHistory ? lead.pageHistory.length : 0})
                                </h4>
                                {lead.pageHistory && lead.pageHistory.length > 0 ? (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflowY: 'auto' }}>
                                    {lead.pageHistory.map((page, pIdx) => (
                                      <div
                                        key={pIdx}
                                        style={{
                                          padding: '8px 12px',
                                          backgroundColor: 'var(--bg-white)',
                                          border: '1px solid var(--navy-pale)',
                                          borderRadius: 'var(--radius-sm)',
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          fontSize: '0.8rem'
                                        }}
                                      >
                                        <span style={{ fontWeight: 600, color: 'var(--navy)', fontFamily: 'monospace' }}>
                                          {page.path}
                                        </span>
                                        <span style={{ color: 'var(--text-light)' }}>
                                          {page.duration ? `${page.duration}s` : 'Active'}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontStyle: 'italic' }}>
                                    No page navigation logged.
                                  </div>
                                )}
                              </div>

                              {/* Search Query Intent */}
                              <div>
                                <h4 style={{ color: 'var(--navy)', fontSize: '0.9rem', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <Search size={15} style={{ color: 'var(--orange)' }} />
                                  Search Inquiries ({lead.searchHistory ? lead.searchHistory.length : 0})
                                </h4>
                                {lead.searchHistory && lead.searchHistory.length > 0 ? (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflowY: 'auto' }}>
                                    {lead.searchHistory.map((search, sIdx) => (
                                      <div
                                        key={sIdx}
                                        style={{
                                          padding: '8px 12px',
                                          backgroundColor: 'var(--bg-white)',
                                          border: '1px solid var(--navy-pale)',
                                          borderRadius: 'var(--radius-sm)',
                                          display: 'flex',
                                          flexDirection: 'column',
                                          gap: '4px',
                                          fontSize: '0.8rem'
                                        }}
                                      >
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                          <strong style={{ color: 'var(--orange)' }}>"{search.query}"</strong>
                                          <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>
                                            {new Date(search.timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                          </span>
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
                                          on page: <span style={{ fontFamily: 'monospace' }}>{search.path}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontStyle: 'italic' }}>
                                    No notice search inputs recorded in this session.
                                  </div>
                                )}
                              </div>

                            </div>
                            
                            {/* Technical Details */}
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', borderTop: '1px dotted var(--navy-pale)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                              <span>Session ID: <code style={{ color: 'var(--navy)' }}>{lead.session_id}</code></span>
                              <span>Consent Granted: <strong style={{ color: 'green' }}>YES</strong></span>
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .notice-popup-toast {
            width: 100% !important;
            right: 0 !important;
            bottom: 0 !important;
            border-radius: 0 !important;
          }
        }
      `}} />
    </div>
  );
}
