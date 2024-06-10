import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FAQ from './pages/FAQs/FAQ';
import ManageFAQs from './pages/FAQs/ManageFAQs';
import AuctionCenter from './pages/AuctionCenter/AuctionCenter';
import HostAuction from './pages/AuctionCenter/HostAuction';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AuctionRegister from './pages/AuctionCenter/AuctionRegister';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/faq" element={<FAQ />} />
              <Route path="/manage-faqs" element={<ManageFAQs />} />
              <Route path="/center" element={<AuctionCenter />} />
              <Route path="/host" element={<HostAuction />} />
              <Route path='/auction-register' element={<AuctionRegister />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
