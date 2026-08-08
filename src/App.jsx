import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import CategoryPage from './pages/CategoryPage';
import Careers from './pages/Careers';
import RequestService from './pages/RequestService';
import About from './pages/About';
import NoticesPage from './pages/NoticesPage';
import AdminLeads from './pages/AdminLeads';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:categorySlug" element={<CategoryPage />} />
          <Route path="careers" element={<Careers />} />
          <Route path="request-service" element={<RequestService />} />
          <Route path="about" element={<About />} />
          <Route path="notification" element={<NoticesPage />} />
          <Route path="admin" element={<AdminLeads />} />
          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
