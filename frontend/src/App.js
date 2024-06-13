import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import useAuth from './redux/dispatch/useAuth';

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
import PersistentLogin from './components/PersistentLogin';
import Profile from './pages/Profile/Profile';
import { Toaster } from '@/components/ui/sonner';

const AppRoutes = () => {
  const { auth } = useAuth();

  if (!auth.token && auth.error) {
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
        <Route
          path="*"
          element={<Navigate to="/login" />}
        />
      </Routes>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route element={<PersistentLogin />}>
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
                path="/home"
                element={<Home />}
              />
              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/kyc"
                element={<Kyc />}
              />
              <Route
                path="/home-bidding"
                element={<BiddingHome />}
              />
            </Route>
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </>
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
