import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FAQ from './components/FAQ';
import ManageFAQs from './components/ManageFAQs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FAQ />} />
        <Route path="/manage-faqs" element={<ManageFAQs />} />
      </Routes>
    </Router>
  );
};

export default App;
