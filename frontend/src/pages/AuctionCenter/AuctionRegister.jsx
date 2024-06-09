import React from 'react';

const AuctionRegister = () => {
    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Register to Title by @username</h2>
            <form>
                <div className="flex flex-row mb-4">
                    <label className="block text-gray-700 w-1/4">Auction ID</label>
                    <input type="text" value="XXXXXXXX" disabled className="w-3/4 mt-2 p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />
                </div>
                <div className="flex flex-row mb-4">
                    <label className="block text-gray-700 w-1/4">Delivery Address *</label>
                    <div className="w-3/4 mt-2">
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                            <option>Telangana</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                </div>
                <div className="flex flex-row mb-4">
                    <label className="block text-gray-700 w-1/4">Pincode</label>
                    <input type="text" placeholder="Pincode" className="w-3/4 mt-2 p-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex flex-row mb-4">
                    <label className="block text-gray-700 w-1/4">Address</label>
                    <input type="text" placeholder="Address" className="w-3/4 mt-2 p-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex flex-row mb-4">
                    <label className="block text-gray-700 w-1/4">Mobile Number</label>
                    <input type="text" placeholder="Mobile Number" className="w-3/4 mt-2 p-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex flex-row mb-4">
                    <label className="block text-gray-700 w-1/4">Email</label>
                    <input type="email" placeholder="Email" className="w-3/4 mt-2 p-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex flex-row mb-4">
                    <label className="block text-gray-700 w-1/4">Bidder ID *</label>
                    <div className="w-3/4 mt-2">
                        <div className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span>Random Bidder ID</span>
                        </div>
                        <div className="flex items-center mt-2">
                            <input type="checkbox" className="mr-2" />
                            <span>same as @UserName [100 nob coins]</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row mb-4">
                    <div className="w-1/4"></div>
                    <div className="w-3/4 mt-2">
                        <div className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span>I agree <a href="#" className="text-blue-500">Terms of Service & Conditions</a> and <a href="#" className="text-blue-500">Privacy Policies</a></span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row mb-4">
                    <label className="block text-gray-700 w-1/4">Message from Seller</label>
                    <input type="text" value="display message given by seller/host (*not an input field)" disabled className="w-3/4 mt-2 p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />
                </div>
                <div className="flex flex-row mb-4">
                    <div className="w-1/4"></div>
                    <button type="submit" className="w-3/4 p-2 bg-blue-500 text-white rounded-md">Register</button>
                </div>
                <div className="flex flex-row mt-2 text-sm text-gray-500">
                    <div className="w-1/4"></div>
                    <div className="w-3/4">
                        *delivery address should be in serviceable locations for seller <br />
                        *only KYC completed users can BID
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AuctionRegister;
