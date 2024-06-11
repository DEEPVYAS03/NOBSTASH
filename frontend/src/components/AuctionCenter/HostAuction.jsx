import React from "react";
import { useNavigate } from "react-router-dom";

const HostAuction = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/host");
  };

  return (
    <div className="max-w-2xl pt-2">
      <span className="font-bold text-lg p-2 border-black border-b-2">
        Select a Category
      </span>
      <div className="flex flex-wrap justify-start gap-4 mt-10">
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 flex-grow"
        >
          Antiques
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 flex-grow"
        >
          Designer Jewelry
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 flex-grow"
        >
          Fashion Accessories
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 flex-grow"
        >
          Licenses
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 flex-grow"
        >
          Assets
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 flex-grow"
        >
          Vehicles
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 flex-grow"
        >
          Fashion Apparel
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 flex-grow"
        >
          Event Tickets
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 flex-grow"
        >
          Appointments
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 flex-grow"
        >
          Awards
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 flex-grow"
        >
          Art
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 flex-grow"
        >
          Gadgets
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 flex-grow"
        >
          Others
        </button>
      </div>
    </div>
  );
};

export default HostAuction;
