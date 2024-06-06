import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HelpIcon from '@mui/icons-material/Help';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white shadow-lg p-4">
      <div className="mb-4 font-bold text-lg">NobStash</div>
      <ul>
        <li className="mb-4 flex items-center">
          <HomeIcon />
          <span className="ml-2">Home</span>
        </li>
        <li className="mb-4 flex items-center">
          <AccountCircleIcon />
          <span className="ml-2">Profile</span>
        </li>
        <li className="mb-4 flex items-center">
          <VerifiedUserIcon />
          <span className="ml-2">KYC</span>
        </li>
        <li className="mb-4 flex items-center">
          <AccountBalanceWalletIcon />
          <span className="ml-2">Trading Account</span>
        </li>
        <li className="mb-4 flex items-center">
          <HelpIcon />
          <span className="ml-2">FAQ</span>
        </li>
        <li className="mb-4 flex items-center">
          <SupportAgentIcon />
          <span className="ml-2">Support</span>
        </li>
        <li className="mb-4 flex items-center">
          <LogoutIcon />
          <span className="ml-2">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
