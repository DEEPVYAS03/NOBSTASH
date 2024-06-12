import { useEffect, useState } from "react";
import React from "react";

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <div className="text-lg font-semibold mb-4">Error</div>
        <div className="mb-4">{message}</div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Kyc = () => {
  const [kycType, setKycType] = useState("Individual");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // expandable
  const [isAadharOpen, setIsAadharOpen] = useState(false);
  const [isPanOpen, setIsPanOpen] = useState(false);
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [isIncorpOpen, setIsIncorpOpen] = useState(false);
  const [isGstinOpen, setIsGstinOpen] = useState(false);

  // status
  const [aadharStatus, setAadharStatus] = useState("INCOMPLETE");
  const [panStatus, setPanStatus] = useState("INCOMPLETE");
  const [bankStatus, setBankStatus] = useState("INCOMPLETE");
  const [incorpStatus, setIncorpStatus] = useState("INCOMPLETE");
  const [gstinStatus, setGstinStatus] = useState("INCOMPLETE");




  const [finalStatus, setFinalStatus] = useState("Not Verified");

  

  // aadhar
  const [aadharNumber, setAadharNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtp, setIsOtp] = useState(false);
  const [isAadharDisabled, setIsAadharDisabled] = useState(false);
  const [isOtpDisabled, setIsOtpDisabled] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(true);

  // pan
  const [panNumber, setPanNumber] = useState("");
  const [panName, setPanName] = useState("");
  const [panDob, setPanDob] = useState("");
  const [isPanDisabled, setIsPanDisabled] = useState(false);
  const [showPanSubmitButton, setShowPanSubmitButton] = useState(true);

  // bank
  const [ifsc, setIfsc] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isBankDisabled, setIsBankDisabled] = useState(false);
  const [showBankSubmitButton, setShowBankSubmitButton] = useState(true);


   // Incorporation
   const [cin, setCin] = useState("");
   const [isIncorpDisabled, setIsIncorpDisabled] = useState(false);
   const [showIncorpSubmitButton, setShowIncorpSubmitButton] = useState(true);
 
   // GSTIN
   const [gstin, setGstin] = useState("");
   const [isGstinDisabled, setIsGstinDisabled] = useState(false);
   const [showGstinSubmitButton, setShowGstinSubmitButton] = useState(true);


  // Error state
  const [error, setError] = useState("");

  const sendOtpClick = () => {
    if (!aadharNumber) {
      setError("Please enter your Aadhar number.");
      return;
    }
    setError("");
    setIsOtp(true);
    setIsAadharDisabled(true);
    setAadharNumber("");
  };

  const verifyOtpClick = () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    setError("");
    setIsOtpDisabled(true);
    setAadharStatus("UNDER REVIEW");
    setOtp("");
    setIsAadharOpen(false);
    setShowVerifyButton(false);
  };


//   pan submit
  const panSubmitClick = () => {
    if (!panNumber || !panName || !panDob) {
      setError("Please fill in all PAN details.");
      return;
    }
    setError("");
    setIsPanDisabled(true);
    setPanStatus("UNDER REVIEW");
    setPanNumber("");
    setPanName("");
    setPanDob("");
    setIsPanOpen(false);
    setShowPanSubmitButton(false);
  };

//   bank submit
  const bankSubmitClick = () => {
    if (!ifsc || !accountNumber) {
      setError("Please fill in all Bank details.");
      return;
    }
    setError("");
    setIsBankDisabled(true);
    setBankStatus("UNDER REVIEW");
    setIfsc("");
    setAccountNumber("");
    setIsBankOpen(false);
    setShowBankSubmitButton(false);
  };

  // Incorporation submit
  const incorpSubmitClick = () => {
    if (!cin) {
      setError("Please enter the CIN.");
      return;
    }
    setError("");
    setIsIncorpDisabled(true);
    setIncorpStatus("UNDER REVIEW");
    setCin("");
    setIsIncorpOpen(false);
    setShowIncorpSubmitButton(false);
  };

  // GSTIN submit
  const gstinSubmitClick = () => {
    if (!gstin) {
      setError("Please enter the GSTIN.");
      return;
    }
    setError("");
    setIsGstinDisabled(true);
    setGstinStatus("UNDER REVIEW");
    setGstin("");
    setIsGstinOpen(false);
    setShowGstinSubmitButton(false);
  };

  // finalStatus
  useEffect(() => {
    if (
      (kycType === "Individual" && aadharStatus === "VERIFIED" && panStatus === "VERIFIED" && bankStatus === "VERIFIED") ||
      (kycType === "Company" && ((incorpStatus === "VERIFIED" && panStatus === "VERIFIED" && gstinStatus === "VERIFIED" && bankStatus === "VERIFIED")))
    ) {
      setFinalStatus("Completed");
    }
  }, [aadharStatus, panStatus, bankStatus, incorpStatus, gstinStatus, kycType]);



  // toggles
  const toggleAadhar = () => setIsAadharOpen(!isAadharOpen);
  const togglePan = () => setIsPanOpen(!isPanOpen);
  const toggleBank = () => setIsBankOpen(!isBankOpen);
  const toggleIncorp = () => setIsIncorpOpen(!isIncorpOpen);
  const toggleGstin = () => setIsGstinOpen(!isGstinOpen);


  const handleCheckboxChange = (type) => {
    setKycType(type);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const renderError = () =>
    error && <Modal message={error} onClose={() => setError("")} />;

  return (
    <div className="p-4 px-8">
      {/* Header */}
      <div className="border-b-2 border-black p-2 flex gap-8 items-center">
        <div className="font-bold text-xl">KYC</div>
        {
            finalStatus === "Completed" ?<div className="border-2 px-2 border-black rounded text-black bg-white py-1">
            Completed
          </div> :<div className="border-2 px-2 border-black rounded text-white bg-black py-1">
            Not verified
          </div>
        }
        
      </div>

      {/* KYC Type */}
      <div className="mt-4 flex items-center">
        <div className="font-bold px-2">KYC Type: </div>
        <div className="flex items-center ml-10 gap-12">
          <div>
            <input
              type="checkbox"
              name="Individual"
              id="individual"
              className={`custom-checkbox ${
                isSubmitted && kycType === "Individual" ? "not-allowed" : ""
              }`}
              checked={kycType === "Individual"}
              onChange={() => handleCheckboxChange("Individual")}
              disabled={isSubmitted && kycType !== "Individual"}
            />
            <label htmlFor="individual" className="ml-2">
              Individual
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              name="Company"
              id="company"
              className={`custom-checkbox ${
                isSubmitted && kycType === "Company" ? "not-allowed" : ""
              }`}
              checked={kycType === "Company"}
              onChange={() => handleCheckboxChange("Company")}
              disabled={isSubmitted && kycType !== "Company"}
            />
            <label htmlFor="company" className="ml-2">
              Company
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className={`px-4 py-[0.3rem] bg-black text-white font-semibold rounded ml-4 ${
              isSubmitted ? "hidden" : ""
            }`}
          >
            Submit
          </button>
        </div>
      </div>

      {renderError()}

      {isSubmitted && kycType === "Individual" && (
        <div className="flex flex-col w-full mt-8 gap-4">
          {/* Aadhar Verification Section */}
          <div className="border rounded shadow-md w-full md:w-10/12">
            <button
              className="px-4 py-2 rounded w-full flex justify-between items-center border-2"
              onClick={toggleAadhar}
            >
              <span className="text-gray-500 font-semibold">
                Aadhar Verification
              </span>
              <span className="text-gray-500">[{aadharStatus}]</span>
              <span className="text-gray-500 font-bold">
                {isAadharOpen ? "-" : "+"}
              </span>
            </button>

            {isAadharOpen && (
              <div className="border-t-2 border-black p-4">
                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    Aadhar Number
                  </div>
                  <input
                    type="number"
                    placeholder="XXXXXXXXXXXX"
                    value={aadharNumber}
                    onChange={(e) => setAadharNumber(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isAadharDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isAadharDisabled}
                  />
                </div>

                {isOtp ? (
                  <div className="flex flex-col mb-4">
                    <div className="flex flex-row">
                    <div className="w-full sm:w-3/12 font-semibold">OTP</div>
                    <input
                      type="number"
                      placeholder="XXXX"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                        isOtpDisabled ? "bg-gray-300" : ""
                      }`}
                      disabled={isOtpDisabled}
                    />
                    </div>
                    {showVerifyButton && (
                      <div className="mt-4">
                        <button
                          className="text-white rounded font-semibold border-2 border-black bg-black px-4 py-1"
                          onClick={verifyOtpClick}
                        >
                          Verify OTP
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-4">
                    <button
                      className="text-white rounded font-semibold border-2 border-black bg-black px-4 py-1"
                      onClick={sendOtpClick}
                    >
                      Send OTP
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* PAN Verification Section */}
          <div className="border rounded shadow-md w-full md:w-10/12">
            <button
              className="px-4 py-2 rounded w-full flex justify-between items-center border-2"
              onClick={togglePan}
            >
              <span className="text-gray-500 font-semibold">
                PAN Verification
              </span>
              <span className="text-gray-500">[{panStatus}]</span>
              <span className="text-gray-500 font-bold">
                {isPanOpen ? "-" : "+"}
              </span>
            </button>

            {isPanOpen && (
              <div className="border-t-2 border-black p-4">
                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    PAN Number
                  </div>
                  <input
                    type="text"
                    placeholder="XXXXXXXXXX"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isPanDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isPanDisabled}
                  />
                </div>

                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    Name on PAN
                  </div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={panName}
                    onChange={(e) => setPanName(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isPanDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isPanDisabled}
                  />
                </div>

                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    Date of Birth
                  </div>
                  <input
                    type="date"
                    placeholder="DOB"
                    value={panDob}
                    onChange={(e) => setPanDob(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isPanDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isPanDisabled}
                  />
                </div>

                {showPanSubmitButton && (
                  <div className="mt-4">
                    <button
                      className="text-white rounded font-semibold border-2 border-black bg-black px-4 py-1"
                      onClick={panSubmitClick}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bank Verification Section */}
          <div className="border rounded shadow-md w-full md:w-10/12">
            <button
              className="px-4 py-2 rounded w-full flex justify-between items-center border-2"
              onClick={toggleBank}
            >
              <span className="text-gray-500 font-semibold">
                Bank Verification
              </span>
              <span className="text-gray-500">[{bankStatus}]</span>
              <span className="text-gray-500 font-bold">
                {isBankOpen ? "-" : "+"}
              </span>
            </button>

            {isBankOpen && (
              <div className="border-t-2 border-black p-4">
                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    IFSC Code
                  </div>
                  <input
                    type="text"
                    placeholder="IFSC"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isBankDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isBankDisabled}
                  />
                </div>

                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    Account Number
                  </div>
                  <input
                    type="text"
                    placeholder="XXXXXXXXXXXX"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isBankDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isBankDisabled}
                  />
                </div>

                {showBankSubmitButton && (
                  <div className="mt-4">
                    <button
                      className="text-white rounded font-semibold border-2 border-black bg-black px-4 py-1"
                      onClick={bankSubmitClick}
                    >
                      Submit 
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Kyc;
