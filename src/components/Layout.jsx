import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import NoticePopup from './NoticePopup';
import LeadCapturePopup from './LeadCapturePopup';
import { logPageView, logPageExit } from '../utils/tracker';

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top and log page view on every route navigation
  useEffect(() => {
    window.scrollTo(0, 0);
    logPageView(pathname);
  }, [pathname]);

  // Log page exit on unload
  useEffect(() => {
    const handleUnload = () => {
      logPageExit();
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: '1 0 auto' }}>
        <Outlet />
      </main>
      <Footer />
      <NoticePopup />
      <LeadCapturePopup />
    </div>
  );
}
