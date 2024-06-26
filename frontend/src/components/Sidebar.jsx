import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoHomeOutline,
  IoHome,
  IoShieldCheckmarkOutline,
  IoShieldCheckmark,
  IoWalletOutline,
  IoWallet,
  IoLogOutOutline,
  IoLogOut,
  IoLogInOutline,
} from 'react-icons/io5';
import profileImage from '../assets/profile.png';
import { FcFaq } from 'react-icons/fc';
import { MdOutlinePhoneInTalk, MdPhoneInTalk } from 'react-icons/md';
import { RiAuctionFill, RiAuctionLine } from 'react-icons/ri';
import useAuth from '@/redux/dispatch/useAuth';
import { Toaster, toast } from 'react-hot-toast';
import styled from 'styled-components';

const CustomToastContainer = styled.div`
  .react-hot-toast {
    width: 400px; /* Adjust this value to your preferred width */
    @media (max-width: 640px) {
      width: 90%; /* Adjust this value for mobile screens */
    }
  }
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState('home');
  const navigate = useNavigate();
  const { logoutUser, auth } = useAuth();

  const handleItemClick = (item, path) => {
    if (!auth.user && ['profile', 'kyc', 'trading', 'center', 'faq', 'support'].includes(item)) {
      toast.error('You need to login first');
    } else {
      setActiveItem(item);
      navigate(path);
      if (window.innerWidth < 640) {
        toggleSidebar(); // Close sidebar on item click for small screens
      }
    }
  };

  return (
    <div className="relative">
      <div
        className={`fixed sm:static z-10 bg-white p-6 shadow-lg border-r border-gray-200 flex flex-col justify-between h-full sm:h-full max-h-[94%] sm:max-h-full transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 sm:w-20 lg:w-60`}
      >
        <div className="flex flex-col space-y-8 flex-grow">
          <div
            className={`flex items-center cursor-pointer ${
              activeItem === 'home' ? 'font-bold' : 'hover:font-bold'
            }`}
            onClick={() => handleItemClick('home', '/')}
          >
            {activeItem === 'home' ? <IoHome className="text-2xl" /> : <IoHomeOutline className="text-2xl" />}
            <span className="ml-3 hidden lg:inline">Home</span>
          </div>
          <div
            className={`flex items-center cursor-pointer ${
              activeItem === 'profile' ? 'font-bold' : 'hover:font-bold'
            }`}
            onClick={() => handleItemClick('profile', '/profile')}
          >
            <img src={profileImage} className="h-7 w-7" alt="profile" />
            <span className="ml-3 hidden lg:inline">Profile</span>
          </div>
          <div
            className={`flex items-center cursor-pointer ${
              activeItem === 'kyc' ? 'font-bold' : 'hover:font-bold'
            }`}
            onClick={() => handleItemClick('kyc', '/kyc')}
          >
            {activeItem === 'kyc' ? <IoShieldCheckmark className="text-2xl" /> : <IoShieldCheckmarkOutline className="text-2xl" />}
            <span className="ml-3 hidden lg:inline">KYC</span>
          </div>
          <div
            className={`flex items-center cursor-pointer ${
              activeItem === 'trading' ? 'font-bold' : 'hover:font-bold'
            }`}
            onClick={() => handleItemClick('trading', '/trading')}
          >
            {activeItem === 'trading' ? <IoWallet className="text-2xl" /> : <IoWalletOutline className="text-2xl" />}
            <span className="ml-3 hidden lg:inline">Trading Account</span>
          </div>
          <div
            className={`flex items-center cursor-pointer ${
              activeItem === 'center' ? 'font-bold' : 'hover:font-bold'
            }`}
            onClick={() => handleItemClick('center', '/center')}
          >
            {activeItem === 'center' ? <RiAuctionFill className="text-2xl" /> : <RiAuctionLine className="text-2xl" />}
            <span className="ml-3 hidden lg:inline">Auction Center</span>
          </div>
          <div
            className={`flex items-center cursor-pointer ${
              activeItem === 'faq' ? 'font-bold' : 'hover:font-bold'
            }`}
            onClick={() => handleItemClick('faq', '/faq')}
          >
            <FcFaq className="text-2xl" />
            <span className="ml-3 hidden lg:inline">FAQ</span>
          </div>
          <div
            className={`flex items-center cursor-pointer ${
              activeItem === 'support' ? 'font-bold' : 'hover:font-bold'
            }`}
            onClick={() => handleItemClick('support', '/support')}
          >
            {activeItem === 'support' ? <MdPhoneInTalk className="text-2xl" /> : <MdOutlinePhoneInTalk className="text-2xl" />}
            <span className="ml-3 hidden lg:inline">Support</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6 pb-10">
          {auth.user ? (
            <div
              className={`flex items-center cursor-pointer ${
                activeItem === 'logout' ? 'font-bold' : 'hover:font-bold'
              }`}
              onClick={() => {
                setActiveItem('logout');
                logoutUser();
                navigate('/login');
              }}
            >
              {activeItem === 'logout' ? <IoLogOut className="text-2xl" /> : <IoLogOutOutline className="text-2xl" />}
              <span className="ml-3 hidden lg:inline">Logout</span>
            </div>
          ) : (
            <div
              className={`flex items-center cursor-pointer ${
                activeItem === 'login' ? 'font-bold' : 'hover:font-bold'
              }`}
              onClick={() => {
                setActiveItem('login');
                navigate('/login');
              }}
            >
              <IoLogInOutline className="text-2xl" />
              <span className="ml-3 hidden lg:inline">Login</span>
            </div>
          )}
        </div>
      </div>
      <CustomToastContainer>
        <Toaster position="top-center" reverseOrder={false} />
      </CustomToastContainer>
    </div>
  );
};

export default Sidebar;
