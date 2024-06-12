import React, { useEffect, useState } from "react";
import painting from "../../assets/painting.jpg";
import tree from "../../assets/tree.jpg";

const BiddingHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTopBiddersOpen, setIsTopBiddersOpen] = useState(false);
  const [isBidOpen, setIsBidOpen] = useState(false);
  const [isAnyOpen, setIsAnyOpen] = useState(false);

  const toggleDiv = () => {
    setIsOpen(!isOpen);
   
  };

  const toggleTopBidders = () => {
    setIsTopBiddersOpen(!isTopBiddersOpen);
    
  };

  const toggleBid = () => {
    setIsBidOpen(!isBidOpen);
  };

  useEffect(() => {
    if (isBidOpen || isTopBiddersOpen || isOpen) {
      setIsAnyOpen(true);
    } else {
      setIsAnyOpen(false);
    }
  }, [isBidOpen, isTopBiddersOpen, isOpen]);


  return (
    <div
      className={`flex flex-col mt-4 mb-10 sm:flex-row sm:pt-2 sm:mb-0 sm:mt-2 sm:p-4`}
    >
      {/* medium size */}
      <div
        className={`${isAnyOpen ? "flex flex-row ":" "} sm:flex-col sm:w-1/2 sm:items-center sm:mb-0 sm:justify-normal`}
      >
        {/* Image */}
        <div className={`sm:w-10/12 lg:w-9/12 ${isAnyOpen?"w-[12rem] h-[12rem] mx-auto mr-0":"mx-auto"}  w-9/12  h-[25rem] sm:mx-auto mb-2 sm:w-10/12 sm:h-[22rem] sm:mb-2 `}>
          <img
            src={painting}
            alt="Oil Painting"
            className="w-full h-full object-fill rounded-md shadow-md"
          />
        </div>
        {/* Description */}
        <div className={`sm:w-10/12 lg:w-9/12 h-fit ${isAnyOpen ? "w-[18rem] h-[12rem] mx-auto ml-2" : "w-9/12 mx-auto"}  px-8 py-4  bg-white sm:mx-auto rounded-lg shadow-lg border-gray-200 border-2 mb-2`}>
          <h2 className="text-lg  font-bold">Oil Painting by Famous Artist</h2>
          <p className="=sm:mb-0">It's a picture of a person</p>
          <p className="font-semibold sm:mb-0">Auction ID - xxxxxx</p>
          <p className="font-bold">Available Quantity: 3</p>
          <p className="text-gray-600 cursor-pointer sm:mt-0">more info...</p>
        </div>

        {/* More Information */}
        <div className="border rounded mx-auto sm:w-10/12 lg:w-9/12 shadow-md mt-2  hidden sm:block sm:mt-1 sm:mb-6">
          <button
            className="px-4 py-2 rounded shadow-md w-full flex justify-between"
            onClick={toggleDiv}
          >
            <span className="text-gray-500 font-semibold ">
              More Information{" "}
            </span>
            <span>{isOpen ? "-" : "+"}</span>
          </button>
          {isOpen && (
            <div className="border-t-2 border-black">
              <div className="flex flex-col gap-2 mb-4 p-4 ">
                <p className="cursor-pointer">Provisional Documents</p>
                <p className="cursor-pointer">Consignor Agreement</p>
                <p className="cursor-pointer">Condition Report</p>
                <p className="cursor-pointer">Terms of Service & Conditions</p>
                <p className="cursor-pointer">Other Information</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sm:w-1/2 lg:5/12 sm:flex sm:flex-col sm:items-center">
        {/* Top Bidders */}

        <div className={`${isAnyOpen ? "w-[30rem]" : "w-9/12"} mx-auto p-2 px-4 border-gray-200 border-2 bg-white rounded shadow-md sm:w-11/12 lg:w-10/12`}>
          <div
            className="flex justify-between items-center w-full mb-1 cursor-pointer"
            onClick={toggleTopBidders}
          >
            <div className="font-semibold text-gray-500">Top Bidders</div>
            <div className="font-bold text-gray-500 cursor-pointer">
              {isTopBiddersOpen ? <span>-</span> : <span>+</span>}
            </div>
          </div>

          {isTopBiddersOpen && (
            <div className="border-t-2 border-black pt-2">
              {/* Bidders List */}
              <div>
                <div className="flex flex-row justify-between mt-1">
                  <div className="flex flex-col">
                    <div className="font-bold">Bidder 1</div>
                    <div className="text-xs text-gray-500">3 min ago</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">1</div>
                    <div className="text-xs text-gray-500">Quantity</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">Rs. 4,500/-</div>
                    <div className="text-xs text-gray-500">bidnumber6</div>
                  </div>
                </div>
                <div className="flex flex-row justify-between mt-1">
                  <div className="flex flex-col">
                    <div className="font-bold">Bidder 1</div>
                    <div className="text-xs text-gray-500">3 min ago</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">1</div>
                    <div className="text-xs text-gray-500">Quantity</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">Rs. 4,500/-</div>
                    <div className="text-xs text-gray-500">bidnumber6</div>
                  </div>
                </div>
                <div className="flex flex-row justify-between mt-1">
                  <div className="flex flex-col">
                    <div className="font-bold">Bidder 1</div>
                    <div className="text-xs text-gray-500">3 min ago</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">1</div>
                    <div className="text-xs text-gray-500">Quantity</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">Rs. 4,500/-</div>
                    <div className="text-xs text-gray-500">bidnumber6</div>
                  </div>
                </div>
                <div className="flex flex-row justify-between mt-1">
                  <div className="flex flex-col">
                    <div className="font-bold">Bidder 1</div>
                    <div className="text-xs text-gray-500">3 min ago</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">1</div>
                    <div className="text-xs text-gray-500">Quantity</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">Rs. 4,500/-</div>
                    <div className="text-xs text-gray-500">bidnumber6</div>
                  </div>
                </div>
              </div>

              {/* Winning and bid more */}
              <div className="border-y-2 border-black mt-2 p-2 font-bold flex flex-row justify-between items-center">
                <div>
                  Winning Bid / <br />
                  Bid more to Win
                </div>
                <div>
                  <button className="px-4 py-2 bg-white border-2 border-black rounded-lg font-bold shadow-lg">
                    Bidding Summary
                  </button>
                </div>
              </div>

              {/* Ad Banner */}
              <div className="w-full h-40 mt-2 mb-2 p-4 rounded shadow-md border-2 border-gray-200">
                <p>Ad Banner</p>
              </div>
            </div>
          )}
        </div>

        {/* Bid Section */}
        <div className={`${isAnyOpen ? "w-[30rem]" : "w-9/12"} mx-auto mt-2 p-2 px-4 border-gray-200 border-2 bg-white rounded shadow-md sm:mt-4 sm:w-11/12 lg:w-10/12`}>
          <div
            className="flex justify-between items-center w-full cursor-pointer"
            onClick={toggleBid}
          >
            <div className="font-semibold text-gray-500 ">Bid</div>
            <div className="font-bold text-gray-500 cursor-pointer">
              {isBidOpen ? <span>-</span> : <span>+</span>}
            </div>
          </div>

          {isBidOpen && (
            <div className="mt-2 pt-2 border-t-2 border-black">
              <div>
                Reserve Price : <span className="font-bold">Rs. 1,000/-</span>{" "}
                <span className="text-sm text-gray-500 font-semibold">
                  per unit
                </span>{" "}
              </div>
              <div className="mt-4 mb-4">
                Highest Bid :{" "}
                <span className="border-2 p-1 px-4 border-gray-200 ml-4 rounded shadow-md">
                  Rs. 4,500/-
                </span>{" "}
              </div>
              <div className="border-2 px-2 py-1 mt-3 w-fit rounded-lg">
                <span className="text-sm font-semibold text-gray-500">
                  {" "}
                  Time left -{" "}
                </span>{" "}
                <span className="font-bold text-red-600">
                  00 Hrs 15 Min 45 Sec
                </span>
              </div>
              <div className="mt-4 w-fit border-2 px-3 py-1 rounded-lg  text-sm text-gray-500 font-semibold">
                Next Bid should be greater than{" "}
                <span className="font-bold"> Rs.3,300/-</span>
              </div>

              <div className="mt-4 flex flex-row items-center ">
                <input
                  type="number"
                  placeholder="5100"
                  className="w-3/12 px-4 py-2 border rounded mb-2"
                />
                <div className="w-fit px-4 py-2 bg-black text-white rounded-lg shadow-md mb-2 ml-10">
                  BID for Rs. 5100
                </div>
              </div>

              <div className="flex flex-col items-center mt-4">
                <p className="font-bold">
                  Account Balance:{" "}
                  <span className="font-semibold">Rs. 20,000/-</span>{" "}
                </p>
                <button className="w-fit mt-3 mb-2  border-2 border-black  px-2 py-2 rounded-lg">
                  Add Funds
                </button>
              </div>
            </div>
          )}
        </div>

        {/* More Information */}
        <div className={`${isAnyOpen ? "w-[30rem]" : "w-9/12"} border rounded mx-auto shadow-md mt-2 sm:hidden`}>
          <button
            className="px-4 py-2 rounded shadow-md w-full flex justify-between"
            onClick={toggleDiv}
          >
            <span className="text-gray-500 font-semibold ">
              More Information{" "}
            </span>
            <span>{isOpen ? "-" : "+"}</span>
          </button>
          {isOpen && (
            <div className="border-t-2 border-black">
              <div className="flex flex-col gap-2 mb-4 p-4 ">
                <p className="cursor-pointer">Provisional Documents</p>
                <p className="cursor-pointer">Consignor Agreement</p>
                <p className="cursor-pointer">Condition Report</p>
                <p className="cursor-pointer">Terms of Service & Conditions</p>
                <p className="cursor-pointer">Other Information</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiddingHome;
