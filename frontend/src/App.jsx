import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccuTaxLanding from './components/landingPage';
import LoginPage from './components/login';
import Dashboard from './components/dash';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccuTaxLanding />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dash" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
