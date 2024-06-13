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
  const [isIPanOpen, setIsIPanOpen] = useState(false);
  const [isIBankOpen, setIsIBankOpen] = useState(false);
  const [isCPanOpen, setIsCPanOpen] = useState(false);
  const [isCBankOpen, setIsCBankOpen] = useState(false);
  const [isIncorpOpen, setIsIncorpOpen] = useState(false);
  const [isGstinOpen, setIsGstinOpen] = useState(false);

  // status
  const [aadharStatus, setAadharStatus] = useState("INCOMPLETE");
  const [iPanStatus, setIPanStatus] = useState("INCOMPLETE");
  const [iBankStatus, setIBankStatus] = useState("INCOMPLETE");
  const [cPanStatus, setCPanStatus] = useState("INCOMPLETE");
  const [cBankStatus, setCBankStatus] = useState("INCOMPLETE");
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

  //individual pan
  const [iPanNumber, setIPanNumber] = useState("");
  const [iPanName, setIPanName] = useState("");
  const [iPanDob, setIPanDob] = useState("");
  const [isIPanDisabled, setIsIPanDisabled] = useState(false);
  const [showIPanSubmitButton, setShowIPanSubmitButton] = useState(true);

  //company pan
  const [cPanNumber, setCPanNumber] = useState("");
  const [cPanName, setCPanName] = useState("");
  const [cPanDob, setCPanDob] = useState("");
  const [isCPanDisabled, setIsCPanDisabled] = useState(false);
  const [showCPanSubmitButton, setShowCPanSubmitButton] = useState(true);

  // individual bank
  const [iIfsc, setIIfsc] = useState("");
  const [iAccountNumber, setIAccountNumber] = useState("");
  const [isIBankDisabled, setIsIBankDisabled] = useState(false);
  const [showIBankSubmitButton, setShowIBankSubmitButton] = useState(true);

  // company bank
  const [cIfsc, setCIfsc] = useState("");
  const [cAccountNumber, setCAccountNumber] = useState("");
  const [isCBankDisabled, setIsCBankDisabled] = useState(false);
  const [showCBankSubmitButton, setShowCBankSubmitButton] = useState(true);

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
    // setAadharNumber("");
  };

  const verifyOtpClick = () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    setError("");
    setIsOtpDisabled(true);
    setAadharStatus("UNDER REVIEW");
    // setOtp("");
    setIsAadharOpen(false);
    setShowVerifyButton(false);
  };

  // individual  pan submit
  const iPanSubmitClick = () => {
    if (!iPanNumber || !iPanName || !iPanDob) {
      setError("Please fill in all PAN details.");
      return;
    }
    setError("");
    setIsIPanDisabled(true);
    setIPanStatus("UNDER REVIEW");
    // setIPanNumber("");
    // setIPanName("");
    // setIPanDob("");
    setIsIPanOpen(false);
    setShowIPanSubmitButton(false);
  };
  // company  pan submit
  const cPanSubmitClick = () => {
    if (!cPanNumber || !cPanName || !cPanDob) {
      setError("Please fill in all PAN details.");
      return;
    }
    setError("");
    setIsCPanDisabled(true);
    setCPanStatus("UNDER REVIEW");
    // setCPanNumber("");
    // setCPanName("");
    // setCPanDob("");
    setIsCPanOpen(false);
    setShowCPanSubmitButton(false);
  };

  //  individual bank submit
  const iBankSubmitClick = () => {
    if (!iIfsc || !iAccountNumber) {
      setError("Please fill in all Bank details.");
      return;
    }
    setError("");
    setIsIBankDisabled(true);
    setIBankStatus("UNDER REVIEW");
    // setIIfsc("");
    // setIAccountNumber("");
    setIsIBankOpen(false);
    setShowIBankSubmitButton(false);
  };

  //   bank submit
  const cBankSubmitClick = () => {
    if (!cIfsc || !cAccountNumber) {
      setError("Please fill in all Bank details.");
      return;
    }
    setError("");
    setIsCBankDisabled(true);
    setCBankStatus("UNDER REVIEW");
    // setCIfsc("");
    // setCAccountNumber("");
    setIsCBankOpen(false);
    setShowCBankSubmitButton(false);
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
    // setCin("");
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
    // setGstin("");
    setIsGstinOpen(false);
    setShowGstinSubmitButton(false);
  };

  // finalStatus
  useEffect(() => {
    if (
      (kycType === "Individual" &&
        aadharStatus === "VERIFIED" &&
        iPanStatus === "VERIFIED" &&
        iBankStatus === "VERIFIED") ||
      (kycType === "Company" &&
        incorpStatus === "VERIFIED" &&
        cPanStatus === "VERIFIED" &&
        gstinStatus === "VERIFIED" &&
        cBankStatus === "VERIFIED")
    ) {
      setFinalStatus("Completed");
    }
  }, [
    aadharStatus,
    iPanStatus,
    iBankStatus,
    cPanStatus,
    cBankStatus,
    incorpStatus,
    gstinStatus,
    kycType,
  ]);

  // toggles
  const toggleAadhar = () => setIsAadharOpen(!isAadharOpen);
  const toggleiPan = () => setIsIPanOpen(!isIPanOpen);
  const toggleiBank = () => setIsIBankOpen(!isIBankOpen);
  const togglecPan = () => setIsCPanOpen(!isCPanOpen);
  const togglecBank = () => setIsCBankOpen(!isCBankOpen);
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
    <div className="p-4">
      {/* Header */}
      <div className="border-b-2 border-black p-2 flex gap-8 items-center">
        <div className="font-bold text-xl">KYC</div>
        {finalStatus === "Completed" ? (
          <div className="border-2 px-2 border-black rounded text-black bg-white py-1">
            Completed
          </div>
        ) : (
          <div className="border-2 px-2 border-black rounded text-white bg-black py-1">
            Not verified
          </div>
        )}
      </div>

      {/* KYC Type */}
      <div className="mt-4 flex items-center">
        <div className="font-bold px-2">KYC Type: </div>
        <div className="flex items-center justify-evenly w-5/12">
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
              isSubmitted ? "cursor-not-allowed" : ""
            }`}
            disabled={isSubmitted}
          >
            Submit
          </button>
        </div>
      </div>

      {renderError()}

      {kycType === "Individual" && (
        <div className="flex flex-col w-full mt-8 gap-4">
          
          {/* Aadhar Verification Section */}
          <div className="border rounded shadow-md w-full md:w-10/12">
            <button
              className={`px-2 py-2 rounded w-full flex justify-between items-center border-2 ${
                isSubmitted ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={isSubmitted ? toggleAadhar : undefined}
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
                    placeholder={
                      isAadharDisabled ? aadharNumber : "XXXXXXXXXXXX"
                    }
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
                        value={isOtpDisabled ? "" : otp}
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
              className={`px-2 py-2 rounded w-full flex justify-between items-center border-2 ${
                isSubmitted ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={isSubmitted ? toggleiPan : undefined}
            >
              <span className="text-gray-500 font-semibold">
                PAN Verification
              </span>
              <span className="text-gray-500">[{iPanStatus}]</span>
              <span className="text-gray-500 font-bold">
                {isIPanOpen ? "-" : "+"}
              </span>
            </button>

            {isIPanOpen && (
              <div className="border-t-2 border-black p-4">
                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    PAN Number
                  </div>
                  <input
                    type="text"
                    placeholder={isIPanDisabled ? iPanNumber : "XXXXXXXXXX"}
                    value={iPanNumber}
                    onChange={(e) => setIPanNumber(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isIPanDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isIPanDisabled}
                  />
                </div>

                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    Name on PAN
                  </div>
                  <input
                    type="text"
                    placeholder={
                      isIPanDisabled ? iPanNumber : "Name as per PAN"
                    }
                    value={iPanName}
                    onChange={(e) => setIPanName(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isIPanDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isIPanDisabled}
                  />
                </div>

                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    Date of Birth
                  </div>
                  <input
                    type="date"
                    placeholder={isIPanDisabled ? iPanDob : "DOB"}
                    value={iPanDob}
                    onChange={(e) => setIPanDob(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isIPanDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isIPanDisabled}
                  />
                </div>

                {showIPanSubmitButton && (
                  <div className="mt-4">
                    <button
                      className="text-white rounded font-semibold border-2 border-black bg-black px-4 py-1"
                      onClick={iPanSubmitClick}
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
              className={`px-2 py-2 rounded w-full flex justify-between items-center border-2 ${
                isSubmitted ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={isSubmitted ? toggleiBank : undefined}
            >
              <span className="text-gray-500 font-semibold">
                Bank Verification
              </span>
              <span className="text-gray-500">[{iBankStatus}]</span>
              <span className="text-gray-500 font-bold">
                {isIBankOpen ? "-" : "+"}
              </span>
            </button>

            {isIBankOpen && (
              <div className="border-t-2 border-black p-4">
                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    IFSC Code
                  </div>
                  <input
                    type="text"
                    placeholder={isIBankDisabled ? iIfsc : "IFSC"}
                    value={iIfsc}
                    onChange={(e) => setIIfsc(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isIBankDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isIBankDisabled}
                  />
                </div>

                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    Account Number
                  </div>
                  <input
                    type="text"
                    placeholder={
                      isIBankDisabled ? iAccountNumber : "XXXXXXXXXXXX"
                    }
                    value={iAccountNumber}
                    onChange={(e) => setIAccountNumber(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isIBankDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isIBankDisabled}
                  />
                </div>

                {showIBankSubmitButton && (
                  <div className="mt-4">
                    <button
                      className="text-white rounded font-semibold border-2 border-black bg-black px-4 py-1"
                      onClick={iBankSubmitClick}
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

      {kycType === "Company" && (
        <div className="flex flex-col w-full mt-8 gap-4">
          {/* Incorportation Verification Section */}
          <div className="border rounded shadow-md w-full md:w-10/12">
            <button
              className={`px-2 py-2 rounded w-full flex justify-between items-center border-2 ${
                isSubmitted ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={isSubmitted ? toggleIncorp : undefined}
            >
              <span className="text-gray-500 font-semibold">
                Incorporation Verification
              </span>
              <span className="text-gray-500">[{incorpStatus}]</span>
              <span className="text-gray-500 font-bold">
                {isIncorpOpen ? "-" : "+"}
              </span>
            </button>

            {isIncorpOpen && (
              <div className="border-t-2 border-black p-4">
                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">CIN</div>
                  <input
                    type="text"
                    placeholder={isIncorpDisabled ? cin : "XXXXXXXXXX"}
                    value={cin}
                    onChange={(e) => setCin(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isIncorpDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isIncorpDisabled}
                  />
                </div>

                {showIncorpSubmitButton && (
                  <div className="mt-4">
                    <button
                      className="text-white rounded font-semibold border-2 border-black bg-black px-4 py-1"
                      onClick={incorpSubmitClick}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* GSTIN Verification Section */}
          <div className="border rounded shadow-md w-full md:w-10/12">
            <button
              className={`px-2 py-2 rounded w-full flex justify-between items-center border-2 ${
                isSubmitted ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={isSubmitted ? toggleGstin : undefined}
            >
              <span className="text-gray-500 font-semibold">
                GSTIN Verification
              </span>
              <span className="text-gray-500">[{gstinStatus}]</span>
              <span className="text-gray-500 font-bold">
                {isGstinOpen ? "-" : "+"}
              </span>
            </button>

            {isGstinOpen && (
              <div className="border-t-2 border-black p-4">
                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">GSTIN</div>
                  <input
                    type="text"
                    placeholder={isGstinDisabled ? gstin : "XXXXXXXXXX"}
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isGstinDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isGstinDisabled}
                  />
                </div>

                {showGstinSubmitButton && (
                  <div className="mt-4">
                    <button
                      className="text-white rounded font-semibold border-2 border-black bg-black px-4 py-1"
                      onClick={gstinSubmitClick}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* PAN Verification Section */}
          <div className="border rounded shadow-md w-full md:w-10/12">
            <button
              className={`px-2 py-2 rounded w-full flex justify-between items-center border-2 ${
                isSubmitted ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={isSubmitted ? togglecPan : undefined}
            >
              <span className="text-gray-500 font-semibold">
                PAN Verification
              </span>
              <span className="text-gray-500">[{cPanStatus}]</span>
              <span className="text-gray-500 font-bold">
                {isCPanOpen ? "-" : "+"}
              </span>
            </button>

            {isCPanOpen && (
              <div className="border-t-2 border-black p-4">
                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    PAN Number
                  </div>
                  <input
                    type="text"
                    placeholder={isCPanDisabled ? cPanNumber : "XXXXXXXXXX"}
                    value={cPanNumber}
                    onChange={(e) => setCPanNumber(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isCPanDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isCPanDisabled}
                  />
                </div>

                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    Name on PAN
                  </div>
                  <input
                    type="text"
                    placeholder={isCPanDisabled ? cPanName : "Name as per PAN"}
                    value={cPanName}
                    onChange={(e) => setCPanName(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isCPanDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isCPanDisabled}
                  />
                </div>

                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    Date of Birth
                  </div>
                  <input
                    type="date"
                    placeholder={isCPanDisabled ? cPanDob : "DOB"}
                    value={cPanDob}
                    onChange={(e) => setCPanDob(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isCPanDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isCPanDisabled}
                  />
                </div>

                {showCPanSubmitButton && (
                  <div className="mt-4">
                    <button
                      className="text-white rounded font-semibold border-2 border-black bg-black px-4 py-1"
                      onClick={cPanSubmitClick}
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
              className={`px-2 py-2 rounded w-full flex justify-between items-center border-2 ${
                isSubmitted ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={isSubmitted ? togglecBank : undefined}
            >
              <span className="text-gray-500 font-semibold">
                Bank Verification
              </span>
              <span className="text-gray-500">[{cBankStatus}]</span>
              <span className="text-gray-500 font-bold">
                {isCBankOpen ? "-" : "+"}
              </span>
            </button>

            {isCBankOpen && (
              <div className="border-t-2 border-black p-4">
                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    IFSC Code
                  </div>
                  <input
                    type="text"
                    placeholder={isCBankDisabled ? cIfsc : "IFSC"}
                    value={cIfsc}
                    onChange={(e) => setCIfsc(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isCBankDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isCBankDisabled}
                  />
                </div>

                <div className="flex flex-row mb-4">
                  <div className="font-semibold w-full sm:w-3/12">
                    Account Number
                  </div>
                  <input
                    type="text"
                    placeholder={
                      isCBankDisabled ? cAccountNumber : "XXXXXXXXXXXX"
                    }
                    value={cAccountNumber}
                    onChange={(e) => setCAccountNumber(e.target.value)}
                    className={`border-2 rounded px-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12 ${
                      isCBankDisabled ? "bg-gray-300" : ""
                    }`}
                    disabled={isCBankDisabled}
                  />
                </div>

                {showCBankSubmitButton && (
                  <div className="mt-4">
                    <button
                      className="text-white rounded font-semibold border-2 border-black bg-black px-4 py-1"
                      onClick={cBankSubmitClick}
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
