import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccuTaxLanding from './components/landingPage';
import LoginPage from './components/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccuTaxLanding />} />
        <Route path="/login" element={<LoginPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
