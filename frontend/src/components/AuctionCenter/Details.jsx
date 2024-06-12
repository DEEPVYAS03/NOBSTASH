import React, { useState } from "react";
import { MdOutlineQuestionMark } from "react-icons/md";

const Details = () => {
  const [isChatEnabled, setIsChatEnabled] = useState(false);
  const [isAdsEnabled, setIsAdsEnabled] = useState(false);
  const [isPocSelf, setIsPocSelf] = useState(true);
  const [isPocOthers, setIsPocOthers] = useState(false);
  const [pocName, setPocName] = useState("");
  const [pocEmail, setPocEmail] = useState("");
  const [pocMobile, setPocMobile] = useState("");
  const [pocAddress, setPocAddress] = useState("");

  const handleChatsToggle = () => {
    setIsChatEnabled(!isChatEnabled);
  };

  const handleAdsToggle = () => {
    setIsAdsEnabled(!isAdsEnabled);
  };

  const handlePocSelfToggle = () => {
    setIsPocSelf(!isPocSelf);
    if (isPocOthers) {
      setIsPocOthers(false);
    }
  };

  const handlePocOthersToggle = () => {
    setIsPocOthers(!isPocOthers);
    if (isPocSelf) {
      setIsPocSelf(false);
    }
  };

  return (
    <div className="px-4 py-2">
      {/* Auction room pr */}
      <div className="flex items-center">
        <span className="border-black border-b-2 font-bold text-lg">
          Auction Room Privileges
        </span>
        <div className="ml-2">
          <MdOutlineQuestionMark className="text-gray-500 cursor-pointer text-lg" />
        </div>
      </div>

      <div className="mt-4">
        {/* Set number of coins */}
        <div className="mb-4">
          <div className="font-bold">
            Set number of coins that has to be collected for alloting Bidder ID
            to registered Bidders
          </div>

          <div className="mt-2 flex flex-row flex-wrap items-center">
            <p className="w-full md:w-3/12 font-bold">Random Bidder ID</p>
            <input
              type="text"
              placeholder="0 nob coins(*not editable)"
              className="mt-1 p-1 w-full md:w-1/2 border border-gray-400 rounded-md bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </div>

          <div className="mt-2 flex flex-row flex-wrap items-center">
            <p className="w-full md:w-3/12 font-bold">Same as their @username</p>
            <input
              type="text"
              placeholder="min 1000 nob coins"
              className="mt-1 p-1 w-full md:w-1/2 border rounded-md"
            />
          </div>
        </div>

        {/* Nob Chat */}
        <div className="mt-4">
          <div className="font-bold">
            <p>Nob Chat [Comment Section in Auction Room]</p>
          </div>

          <div className="flex gap-3 mt-2 flex-wrap">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={!isChatEnabled}
                onChange={handleChatsToggle}
                className="mr-2 custom-checkbox"
              />
              Disable
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isChatEnabled}
                onChange={handleChatsToggle}
                className="mr-2 custom-checkbox"
              />
              Enable
            </label>
          </div>
        </div>

        {/* Display ads */}
        <div className="mt-4">
          <div className="font-bold">
            <p>Display Ads in Auction Room</p>
          </div>

          <div className="flex gap-3 mt-2 flex-wrap">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={!isAdsEnabled}
                onChange={handleAdsToggle}
                className="mr-2 custom-checkbox"
              />
              No
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isAdsEnabled}
                onChange={handleAdsToggle}
                className="mr-2 custom-checkbox"
              />
              Yes
            </label>
          </div>
        </div>

        {/* POC details */}
        <div className="mt-4">
          <div className="flex items-center">
            <span className="border-b-2 border-black font-bold">
              Point of Contact [POC]
            </span>

            <div className="flex gap-4 ml-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isPocSelf}
                  onChange={handlePocSelfToggle}
                  className="mr-2 custom-checkbox"
                />
                Self
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isPocOthers}
                  onChange={handlePocOthersToggle}
                  className="mr-2 custom-checkbox"
                />
                Others
              </label>
            </div>
          </div>

          <div className="mt-4 flex flex-row flex-wrap items-center">
            <label className="w-full md:w-1/12 text-gray-700 text-sm font-bold" htmlFor="pocName">
              Name
            </label>
            <input
              className="mt-1 md:mt-0 shadow appearance-none border rounded w-full md:w-4/12 py-1 px-2 text-gray-700 leading-tight focus:shadow-outline"
              id="pocName"
              type="text"
              placeholder="Name"
              value={pocName}
              onChange={(e) => setPocName(e.target.value)}
            />
          </div>

          <div className="mt-4 flex flex-row flex-wrap items-center">
            <label className="w-full md:w-1/12 text-gray-700 text-sm font-bold" htmlFor="pocEmail">
              Email
            </label>
            <input
              className="mt-1 md:mt-0 shadow appearance-none border rounded w-full md:w-4/12 py-1 px-2 text-gray-700 leading-tight focus:shadow-outline"
              id="pocEmail"
              type="email"
              placeholder="example@email.com"
              value={pocEmail}
              onChange={(e) => setPocEmail(e.target.value)}
            />
          </div>

          <div className="mt-4 flex flex-row flex-wrap items-center">
            <label className="w-full md:w-1/12 text-gray-700 text-sm font-bold" htmlFor="pocMobile">
              Mobile
            </label>
            <input
              className="mt-1 md:mt-0 shadow appearance-none border rounded w-full md:w-4/12 py-1 px-2 leading-tight focus:shadow-outline"
              id="pocMobile"
              type="text"
              placeholder="9999999999"
              value={pocMobile}
              onChange={(e) => setPocMobile(e.target.value)}
            />
          </div>

          <div className="mt-4 flex flex-row flex-wrap items-center">
            <label className="w-full md:w-1/12 text-gray-700 text-sm font-bold" htmlFor="pocAddress">
              Address
            </label>
            <input
              className="mt-1 md:mt-0 shadow appearance-none border rounded w-full md:w-4/12 py-1 px-2 text-gray-700 leading-tight focus:shadow-outline"
              id="pocAddress"
              type="text"
              placeholder="Address"
              value={pocAddress}
              onChange={(e) => setPocAddress(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <button className="bg-black text-white font-bold py-2 px-6 rounded mt-4">
              Host
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
