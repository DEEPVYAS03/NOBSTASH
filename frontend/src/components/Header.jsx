import React from 'react';
import profileImage from '../assets/profile.png';

const Header = () => {
  return (
    <div className="w-full p-4 bg-gray-200 rounded-b-sm flex justify-between items-center">
      <div className="font-bold text-xl">Nobstash</div>
      <div className='cursor-pointer'>
        <img src={profileImage} alt="Profile" className="h-9 w-9" />
      </div>
    </div>
  );
};

export default Header;
