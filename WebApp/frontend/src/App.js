import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import CardPage from './pages/CardPage';
import OnboardingPage from './pages/OnboardingPage.js';
import DashboardPage from './pages/DashboardPage';
import EmailVerification from './components/EmailVerification';
import PasswordReset from './components/PasswordReset';
import ForgotPasswordPage from './pages/ForgotPasswordPage.js'
import RegistrationCard from './components/RegistrationCard.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route path="/*" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/verifyToken/:token" element={<EmailVerification />} />
        {/* <Route path="/forgotPassword" element={<ForgotPasswordPage />} /> */}
        <Route path="/resetPassword/:token" element={<PasswordReset />} />
        <Route path="/test" element={<RegistrationCard />} />
      </Routes>
    </BrowserRouter>
      );
}

export default App;


