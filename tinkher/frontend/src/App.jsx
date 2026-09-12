import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import VerificationPage from './pages/VerificationPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  const [isDemoMode, setIsDemoMode] = useState(true);

  return (
    <MainLayout isDemoMode={isDemoMode} setIsDemoMode={setIsDemoMode}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/verification/:applicationId" element={<VerificationPage isDemoMode={isDemoMode} />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </MainLayout>
  );
}
