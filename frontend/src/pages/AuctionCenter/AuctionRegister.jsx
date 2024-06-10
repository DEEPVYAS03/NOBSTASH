import React, { useState } from "react";

const indianStates = [
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghalaya", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Tripura", label: "Tripura" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "West Bengal", label: "West Bengal" },
];

const AuctionRegister = () => {
  const [auctionID, setAuctionID] = useState("XXXXXXXX");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [randomBidderID, setRandomBidderID] = useState(false);
  const [sameAsUserName, setSameAsUserName] = useState(false);
  const [agreement, setAgreement] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="p-1 px-16">
      {/* Heading */}
      <div className="border-b-2 border-black p-2">
        <div className="text-xl">
          Register to <span className="font-bold">Title</span> by{" "}
          <span className="font-bold">@username</span>
        </div>
      </div>

      <form className="mt-2" onSubmit={handleSubmit}>
        {/* Auction ID */}
        <div className="flex flex-row ml-8 items-center">
          <label className="block w-2/12 font-semibold">Auction ID</label>
          <input
            type="text"
            placeholder={auctionID}
            disabled
            className="w-6/12 mt-2 p-1 px-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Delivery Address */}
        <div className="text-lg font-bold mt-2">Delivery Address *</div>

        {/* State */}
        <div className="flex flex-row mb-1 mt-2 ml-8 items-center">
          <label className="block w-2/12 font-semibold">State</label>
          <div className="w-6/12 mt-2">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-1 px-2 border border-gray-300 rounded-md"
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pincode */}
        <div className="flex flex-row mb-1 ml-8 items-center">
          <label className="block font-semibold w-2/12">Pincode</label>
          <input
            type="number"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Pincode"
            className="w-6/12 mt-2 p-1 px-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Address */}
        <div className="flex flex-row mb-1 ml-8 items-center">
          <label className="block font-semibold w-2/12">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-6/12 mt-2 p-1 px-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Mobile Number */}
        <div className="flex flex-row mb-1 ml-8 items-center">
          <label className="block font-semibold w-2/12">Mobile Number</label>
          <input
            type="number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Mobile Number"
            className="w-6/12 mt-2 p-1 px-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Email */}
        <div className="flex flex-row mb-1 ml-8 items-center">
          <label className="block font-semibold w-2/12">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-6/12 mt-2 p-1 px-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Bidder ID */}
        <div className="text-lg font-bold mt-3">Bidder ID</div>
        <div className="flex flex-row mb-2 ml-8 items-center">
          <div className="w-6/12 mt-2">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2 custom-checkbox"
                checked={randomBidderID}
                onChange={(e) => setRandomBidderID(e.target.checked)}
              />
              <span className="font-semibold">Random Bidder ID</span>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                className="mr-2 custom-checkbox"
                checked={sameAsUserName}
                onChange={(e) => setSameAsUserName(e.target.checked)}
              />
              <span className="font-semibold">same as @UserName [100 nob coins]</span>
            </div>
          </div>
        </div>

        {/* Agreement */}
        <div className="flex flex-row mb-2 mt-3 items-center">
          <div className="w-6/12 mt-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 custom-checkbox"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              <span className="font-semibold">
                I agree{" "}
                <a href="#" className="font-bold border-b-2 border-black">
                  Terms of Service & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="font-bold border-b-2 border-black">
                  Privacy Policies
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Message from Seller */}
        <div className="flex flex-row mb-4 items-center">
          <label className="block font-semibold w-2/12">Message from Seller</label>
          <input
            type="text"
            placeholder="display message given by seller/host (*not an input field)"
            disabled
            className="w-6/12 mt-2 p-1 px-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Register Button */}
        <div className="flex flex-row items-center">
          <button
            type="submit"
            className="w-2/12 h-14 mt-2 p-2 bg-black text-white rounded-md font-bold cursor-pointer"
          >
            Register
          </button>
          <div className="w-6/12 ml-12 font-semibold">
            <span>*delivery address should be in serviceable locations for seller</span>
            <br />
            <span>*only KYC completed users can BID</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuctionRegister;
