import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Eye, 
  Clock, 
  Award, 
  ArrowRight, 
  BookOpen, 
  FileText, 
  Users, 
  TrendingUp, 
  ShieldAlert 
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ImageRotator from '../components/ImageRotator';
import StatsCounter from '../components/StatsCounter';
import AwardsPanel from '../components/AwardsPanel';
import DiagonalBanner from '../components/DiagonalBanner';

export default function About() {
  const storyImages = [
    '/images/photo1.jpg',
    '/images/photo2.jpg',
    '/images/photo3.jpg'
  ];

  const headerImages = [
    '/images/photo4.jpg',
    '/images/photo5.jpg',
    '/images/photo6.jpg'
  ];

  const timelineEvents = [
    {
      year: '1995',
      title: 'Practice Origins',
      description: 'Founding members establish initial advisory practice roots, starting a legacy of expert tax and accounting service.'
    },
    {
      year: '2009',
      title: 'Formalised Operations',
      description: 'Operations were formalised under the Accounts Bureau umbrella, marking a major step from a small practice to a structured business.'
    },
    {
      year: '2010',
      title: 'Tally Certified Partner',
      description: 'Became a Tally Certified Partner, strengthening our technical capability in accounting software and systems.'
    },
    {
      year: '2014',
      title: 'First Professional Office',
      description: 'Moved into our first professional office in Sector-17, Rohini, Delhi, growing the team significantly as client demand increased.'
    },
    {
      year: '2017',
      title: 'Incorporated as Accosoft Solutions',
      description: 'Accosoft Solutions Pvt Ltd is officially incorporated, consolidating our specialized accounting, auditing, and compliance services into a dedicated entity.'
    },
    {
      year: 'Today',
      title: 'A Growing Specialized Practice',
      description: 'A growing practice serving 250+ clients with a team of 20+ professionals handling GST filing, bookkeeping, payroll, financial reporting, and business advisory work.'
    }
  ];

  const stats = [
    { iconName: 'Award', targetValue: 30, suffix: ' Yrs', label: 'Work Experience' },
    { iconName: 'Users', targetValue: 250, suffix: '+', label: 'Clients Served' },
    { iconName: 'UserCheck', targetValue: 20, suffix: '+', label: 'Team Members' },
    { iconName: 'Shield', targetValue: 100, suffix: '%', label: 'GST & Compliance Focus' }
  ];

  const values = [
    {
      title: 'Trust',
      desc: 'Backed by over three decades of professional work experience, ensuring reliable financial guidance, statutory adherence, and strict client confidentiality.',
      icon: ShieldCheck
    },
    {
      title: 'Transparency',
      desc: 'Clear communication, honest assessments, and no hidden complexities in our service engagements.',
      icon: Eye
    },
    {
      title: 'Consistency',
      desc: 'Delivering precise filing, bookkeeping, and payroll audits on schedule, month after month.',
      icon: Clock
    },
    {
      title: 'Service Excellence',
      desc: 'A dedicated team support system ensures quick query resolutions and tailored business advisory.',
      icon: Award
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="About Our Company"
        subtitle="Incorporated in 2017, Accosoft Solutions is built on a team with over 30 years of professional work experience."
        images={headerImages}
        breadcrumbs={[{ name: 'About Us', path: '/about' }]}
      />

      {/* Intro Section */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
            <div>
              <span style={{ color: 'var(--orange)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                Legacy • Growth • Trust • Excellence
              </span>
              <h2 style={{ marginBottom: '1.5rem' }}>Decades of Financial Expertise</h2>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                Accosoft Solutions Pvt Ltd was incorporated in 2017 to focus on Accounting, Taxation, and Auditing services as a dedicated, specialized practice. Headquartered in New Delhi, the company brings together a team with over 30 years of professional work experience helping growing Indian companies navigate complex taxation frameworks, clean bookkeeping, and reliable statutory audits with ease.
              </p>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                As a specialized practice, we believe that robust financial administration forms the bedrock of sustainable business growth. By combining deep tax domain knowledge with modern ledger technology, we ensure your business remains audit-ready and fully compliant at all times.
              </p>
            </div>
            <div style={{ height: '380px', width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--navy-pale)' }}>
              <ImageRotator
                images={storyImages}
                interval={4500}
                borderRadius="var(--radius-lg)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visual Timeline Section */}
      <section className="bg-light" style={{ padding: '6rem 0', borderTop: '1px solid var(--navy-pale)', borderBottom: '1px solid var(--navy-pale)' }}>
        <div className="container">
          <div className="section-header">
            <span style={{ color: 'var(--orange)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
              OUR JOURNEY
            </span>
            <h2>Our Story and Key Milestones</h2>
            <p className="lead">Tracing our evolution from a local home practice to an incorporated corporate consulting company.</p>
          </div>

          {/* Timeline Container */}
          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '1rem 0' }} className="timeline-container">
            {/* Center line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '4px',
              backgroundColor: 'var(--navy-pale)',
              transform: 'translateX(-50%)',
              zIndex: 1
            }} className="timeline-line" />

            {timelineEvents.map((event, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  style={{
                    display: 'flex',
                    justifyContent: isEven ? 'flex-start' : 'flex-end',
                    alignItems: 'center',
                    position: 'relative',
                    width: '100%',
                    marginBottom: '3rem',
                  }}
                  className="timeline-item"
                >
                  {/* Circle dot in middle */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-white)',
                    border: '4px solid var(--orange)',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    boxShadow: 'var(--shadow-sm)'
                  }} className="timeline-dot" />

                  {/* Card content */}
                  <div 
                    className="card timeline-card"
                    style={{
                      width: '45%',
                      margin: 0,
                      padding: '1.75rem',
                      border: '1px solid var(--navy-pale)',
                      position: 'relative',
                      backgroundColor: 'var(--bg-white)',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <span style={{
                      display: 'inline-block',
                      backgroundColor: 'var(--navy)',
                      color: 'var(--bg-white)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      marginBottom: '0.75rem'
                    }}>
                      {event.year}
                    </span>
                    <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', color: 'var(--navy)' }}>{event.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: '1.6' }}>{event.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Media queries for timeline responsiveness */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 768px) {
            .timeline-line {
              left: 20px !important;
            }
            .timeline-item {
              justify-content: flex-start !important;
              padding-left: 45px !important;
              width: 100% !important;
            }
            .timeline-dot {
              left: 20px !important;
              transform: translateX(-50%) !important;
            }
            .timeline-card {
              width: 100% !important;
            }
          }
        `}} />
      </section>

      {/* What Our Team Does Section */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
            {/* Visual Grid representing functions */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem'
            }}>
              {[
                { label: 'GST Compliance', icon: FileText, desc: 'Filing & ITC reconciliation' },
                { label: 'Bookkeeping', icon: BookOpen, desc: 'Ledger maintaining & reporting' },
                { label: 'Payroll Processing', icon: Users, desc: 'PF, ESI & salary processing' },
                { label: 'Business Advisory', icon: TrendingUp, desc: 'Tax & loan consultations' }
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={idx} 
                    className="card" 
                    style={{ 
                      padding: '1.75rem', 
                      textAlign: 'center', 
                      backgroundColor: 'var(--bg-light)',
                      border: '1px solid var(--navy-pale)'
                    }}
                  >
                    <div style={{ 
                      width: '3rem', 
                      height: '3rem', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--navy-pale)', 
                      color: 'var(--navy)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      margin: '0 auto 1rem'
                    }}>
                      <IconComponent size={20} />
                    </div>
                    <h4 style={{ fontSize: '0.95rem', margin: '0 0 0.25rem', color: 'var(--navy)' }}>{item.label}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', margin: 0 }}>{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Description Content */}
            <div>
              <span style={{ color: 'var(--orange)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                OUR TEAM
              </span>
              <h2 style={{ marginBottom: '1.5rem' }}>Experienced Compliance Professionals</h2>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.95rem', lineHeight: '1.75', marginBottom: '1.25rem' }}>
                Our 20+ member team works across GST compliance, bookkeeping, payroll processing, financial reporting, and business advisory — giving every client a dedicated group of professionals rather than a single point of contact.
              </p>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.95rem', lineHeight: '1.75', margin: 0 }}>
                By avoiding dependencies on individual names and single contact pipelines, we maintain absolute continuity of service. Every filing deadlines desk is manned by a collaborative group of experts who know your business logs inside-out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-light" style={{ padding: '5rem 0', borderTop: '1px solid var(--navy-pale)', borderBottom: '1px solid var(--navy-pale)' }}>
        <div className="container">
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span style={{ color: 'var(--orange)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
              OUR VALUES
            </span>
            <h2>Core Operating Principles</h2>
            <p className="lead">The fundamental values guiding our client commitments and service standards.</p>
          </div>

          <div className="grid-4">
            {values.map((val, idx) => {
              const IconComponent = val.icon;
              return (
                <div 
                  key={idx} 
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '2rem',
                    border: '1px solid var(--navy-pale)'
                  }}
                >
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--navy-pale)',
                    color: 'var(--navy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--navy)' }}>{val.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: 0, lineHeight: '1.6' }}>{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications and Awards row */}
      <AwardsPanel />

      {/* Diagonal CTA Banner using official contact number and email */}
      <DiagonalBanner variant="navy">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem'
          }}
          className="grid-2"
        >
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ color: 'var(--bg-white)', marginBottom: '0.75rem' }}>Need Expert Compliance Consultation?</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.05rem', margin: 0 }}>
              Talk to our team at <strong>+91 9716799777</strong> or email <strong>info@accosoftsolutions.com</strong> to schedule a free initial audit of your tax status.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="tel:+919716799777" className="btn btn-ghost-dark">
              Call Team
            </a>
            <Link to="/request-service" className="btn btn-orange">
              Request Advisory Call
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </DiagonalBanner>
    </div>
  );
}
