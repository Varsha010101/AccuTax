import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccuTaxLanding from './components/landingPage';
import LoginPage from './components/login';
import Dashboard from './components/dash';
import Calci from './components/cal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccuTaxLanding />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/cal" element={<Calci />} />
      </Routes>
    </Router>
  );
}

export default App;
