import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

// import LoginPage from './pages/LoginPage';
import LoginPage from './pages/DemoLoginPage';
import CardPage from './pages/CardPage';
import DashboardPage from './pages/DashboardPage';
import EmailVerification from './components/EmailVerification';
import PasswordReset from './components/PasswordReset';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage register />} />
        <Route path="/cards" element={<CardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/verifyToken/:token" element={<EmailVerification />} />
        <Route path="/resetPassword/:token" element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
      );
}

export default App;


