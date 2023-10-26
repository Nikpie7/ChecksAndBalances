import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

// import LoginPage from './pages/LoginPage';
import LoginPage from './pages/DemoLoginPage';
import CardPage from './pages/CardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage register />} />
        <Route path="/cards" element={<CardPage />} />
      </Routes>
    </BrowserRouter>
      );
}

export default App;


