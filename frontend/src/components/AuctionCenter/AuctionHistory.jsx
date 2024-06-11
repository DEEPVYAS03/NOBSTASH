import React, { useState } from "react";
import painting from "../../assets/painting.jpg";

const AuctionHistory = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-md w-full max-w-2xl font-sans m-4 p-4 bg-white">
        <img
          src={painting}
          alt="Oil Painting"
          className="w-full md:w-60 h-60 md:h-auto object-fill border-2 rounded-lg cursor-pointer"
          onClick={handleImageClick}
        />
        <div className="flex flex-col justify-between mt-4 md:mt-0 md:ml-4 flex-1">
          <div className="">
            <h2 className="text-lg font-semibold"><span className="font-bold">Oil Painting</span> by Famous Artist</h2>
            <p className="text-gray-600">It's a picture of a person</p>
            <div className="mt-5">
              <p className="font-bold">Reserve Price</p>
              <p>Rs. 1,000/-</p>
            </div>
            <div className="mt-5">
              <p className="font-bold">Auction ID: XXXXXXXXX</p>
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-white border-2 border-black font-bold rounded-lg cursor-not-allowed">
            Approval Pending
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-4/5 md:w-3/5 h-4/5 md:h-3/5">
            <button
              className="absolute top-0 right-11 text-white text-4xl font-bold"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <img src={painting} alt="Oil Painting" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionHistory;
