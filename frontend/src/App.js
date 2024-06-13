import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import SignUp from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';

import FAQ from './pages/FAQs/FAQ';
import ManageFAQs from './pages/FAQs/ManageFAQs';
import AuctionCenter from './pages/AuctionCenter/AuctionCenter';
import HostAuction from './pages/AuctionCenter/HostAuction';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AuctionRegister from './pages/AuctionCenter/AuctionRegister';
import BiddingHome from './pages/Home/BiddingHome';
import Home from './pages/Home/Home';
import Kyc from './pages/Kyc/Kyc';
import Profile from './pages/Profile/Profile';
import PersistentLogin from './components/PersistentLogin';
import { Toaster } from '@/components/ui/sonner';
import Trading from './pages/Trading';
import Support from './Support';
import useAuth from './redux/dispatch/useAuth';
import { useState } from 'react';

const AppRoutes = () => {
  const { auth } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/signup"
        element={<SignUp />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />
      <Route element={<PersistentLogin />}>
        <Route
          path="*"
          element={
            <>
              <Header toggleSidebar={toggleSidebar} />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
                <div className="flex-1 overflow-auto">
                  <Routes>
                    <Route
                      path="/"
                      element={<Home />}
                    />
                    {auth.user ? (
                      <>
                        <Route
                          path="/faq"
                          element={<FAQ />}
                        />
                        <Route
                          path="/profile"
                          element={<Profile />}
                        />
                        <Route
                          path="/manage-faqs"
                          element={<ManageFAQs />}
                        />
                        <Route
                          path="/center"
                          element={<AuctionCenter />}
                        />
                        <Route
                          path="/host"
                          element={<HostAuction />}
                        />
                        <Route
                          path="/auction-register"
                          element={<AuctionRegister />}
                        />
                        <Route
                          path="/kyc"
                          element={<Kyc />}
                        />
                        <Route
                          path="/home-bidding"
                          element={<BiddingHome />}
                        />
                        <Route
                          path="/trading"
                          element={<Trading />}
                        />
                        <Route
                          path="/support"
                          element={<Support />}
                        />
                        <Route
                          path="*"
                          element={<Navigate to="/" />}
                        />
                      </>
                    ) : (
                      <Route
                        path="*"
                        element={<Navigate to="/" />}
                      />
                    )}
                  </Routes>
                </div>
              </div>
            </>
          }
        />
      </Route>
    </Routes>
  );
};

const App = () => (
  <Router>
    <div className="flex flex-col h-screen">
      <AppRoutes />
      <Toaster
        position="top-right"
        richColors={true}
        theme="light"
      />
    </div>
  </Router>
);

export default App;
