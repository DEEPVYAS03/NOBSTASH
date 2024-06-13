import React, { useState } from 'react';
import Painting from '../../assets/painting.jpg';
import Tree from '../../assets/tree.jpg';
import { useNavigate } from 'react-router';

import useAuth from '@/redux/dispatch/useAuth';

const Home = () => {
  const { auth } = useAuth();
  const [isRegistered, setIsRegistered] = useState(true);
  const navigate = useNavigate();
  const bidButtonClick = () => {
    navigate('/home-bidding');
  };
  console.log('Home',auth);

  return (
    <div className='flex flex-col h-full'>
      <div className="mt-4 mb-4 flex flex-col sm:flex-row gap-4 border-2 w-11/12 lg:w-8/12 mx-auto p-4 rounded shadow-lg h-auto sm:h-96">
        {/* Left */}
        <div className='w-full sm:w-5/12'>
          <img src={Painting} alt="Painting" className='w-full h-full object-fill rounded shadow-md' />
        </div>
        {/* Right */}
        <div className='w-full sm:w-7/12 flex flex-col justify-between p-2'>
          <div>
            <p><span className='font-bold'>Oil Painting </span>by <span className='font-semibold'>Famous Artist</span></p>
            <p className='text-sm text-gray-600'>It's a picture of person</p>
            <p className='mt-2'>Start Time - 18:30:00{"    "}25/06/2024</p>
            <p className=''>End Time - 18:30:00{"    "}25/06/2024</p>
            <p className='mt-2 font-bold'>Reserve Price</p>
            <p className=''>Rs 1,000/-</p>
            <p className='mt-2 font-bold'>Highest Bid</p>
            <p className=''>Rs 1,000/-</p>
          </div>
          {/* buttons */}
          <div className='mt-4 flex flex-col sm:flex-row gap-4'>
            {
              isRegistered ?
                <button className='w-full sm:w-1/2 px-4 py-2 rounded-lg bg-black text-white' onClick={bidButtonClick}>Bid</button> :
                <button className='w-full sm:w-1/2 px-4 py-2 rounded-lg bg-black text-white'>Register to Bid</button>
            }
            <button className='w-full sm:w-1/2 px-4 py-2 rounded-lg bg-white text-black border-black border-2'>View</button>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row gap-4 border-2 w-11/12 lg:w-8/12 mx-auto p-4 rounded shadow-lg h-auto sm:h-96">
        {/* Left */}
        <div className='w-full sm:w-5/12'>
          <img src={Tree} alt="Tree" className='w-full h-full object-fill rounded shadow-md' />
        </div>
        {/* Right */}
        <div className='w-full sm:w-7/12 flex flex-col justify-between p-2'>
          <div>
            <p><span className='font-bold'>Oil Painting </span>by <span className='font-semibold'>Famous Artist</span></p>
            <p className='text-sm text-gray-600'>It's a picture of person</p>
            <p className='mt-2'>Start Time - 18:30:00{"    "}25/06/2024</p>
            <p className=''>End Time - 18:30:00{"    "}25/06/2024</p>
            <p className='mt-2 font-bold'>Reserve Price</p>
            <p className=''>Rs 1,000/-</p>
            <p className='mt-2 font-bold'>Highest Bid</p>
            <p className=''>Rs 1,000/-</p>
          </div>
          {/* buttons */}
          <div className='mt-4 flex flex-col sm:flex-row gap-4'>
            {
              isRegistered ?
                <button className='w-full sm:w-1/2 px-4 py-2 rounded-lg bg-black text-white' onClick={bidButtonClick}>Bid</button> :
                <button className='w-full sm:w-1/2 px-4 py-2 rounded-lg bg-black text-white'>Register to Bid</button>
            }
            <button className='w-full sm:w-1/2 px-4 py-2 rounded-lg bg-white text-black border-black border-2'>View</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
