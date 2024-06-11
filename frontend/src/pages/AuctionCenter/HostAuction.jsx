import React, { useState } from "react";
import { MdOutlineQuestionMark } from "react-icons/md";
import Select from "react-select";
import Details from "../../components/AuctionCenter/Details";

const HostAuction = () => {
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

  const [tooltip, setTooltip] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reservePrice, setReservePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [serviceableLocations, setServiceableLocations] = useState([]);
  const [messageToBidders, setMessageToBidders] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState(null);
  const [videos, setVideos] = useState(null);
  const [provenanceDocuments, setProvenanceDocuments] = useState(null);
  const [consignorAgreement, setConsignorAgreement] = useState(null);
  const [termsConditions, setTermsConditions] = useState(null);
  const [conditionReport, setConditionReport] = useState(null);
  const [error, setError] = useState(null);

  const allowedImageTypes = ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "webp", "svg", "heic"];
  const allowedVideoTypes = ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm", "mpeg", "mpg", "3gp", "m4v"];
  const allowedDocumentTypes = ["pdf", "doc", "docx", "txt"];

  const handleQuestionClick = (text) => {
    setTooltip(text);
  };

  const closeTooltip = () => {
    setTooltip(null);
  };

  const handleFileChange = (event, setter, allowedTypes) => {
    const file = event.target.files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      setError(`Invalid file type. Allowed types: ${allowedTypes.join(", ")}`);
      event.target.value = null;
      window.alert("Invalid file type. Allowed types: " + allowedTypes.join(", "));
    } else {
      setError(null);
      setter(file);
    }
  };

  return (
    <div>
      {/* first view */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl p-3 font-bold border-b-2 border-black">
          Host Auction
        </h1>

        <div className="flex flex-col md:flex-row bg-white border-black border-b-2">
          {/* Basic Details Section */}
          <div className="w-full md:w-2/3 px-4 py-2 border-r border-gray-200">
            <span className="text-lg font-semibold px-2 border-b-2 border-black">
              Basic Details
            </span>

            <div className="flex flex-col min-w-full gap-1 mt-2 p-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">Title</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="text"
                    placeholder="Title"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick("Enter the title of the auction.")
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">Host Name</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="text"
                    placeholder="@username(*not editable)"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick("This field is not editable.")
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">Auction ID</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="text"
                    placeholder="xxxxxx(*not editable)"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "This is the unique ID of the auction and is not editable."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">Description</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="text"
                    placeholder="description"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "Provide a description for the auction."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">Reserve Price</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="number"
                    placeholder="1000"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={reservePrice}
                    onChange={(e) => setReservePrice(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "Enter the reserve price for the auction."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">Quantity</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="number"
                    placeholder="n"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "Enter the quantity of items in the auction."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">
                  Serviceable Location
                </label>
                <div className="flex items-center w-full sm:w-3/4">
                  <Select
                    isMulti
                    options={indianStates}
                    value={serviceableLocations}
                    onChange={(selectedOptions) =>
                      setServiceableLocations(selectedOptions)
                    }
                    className="mt-1 w-full"
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "Select the locations where the auction items can be serviced."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">Start Date</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "Enter the start date for the auction."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">Start Time</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="time"
                    placeholder="17:30"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "Enter the start time for the auction."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">End Date</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick("Enter the end date for the auction.")
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">End Time</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="time"
                    placeholder="23:15"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick("Enter the end time for the auction.")
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">
                  Message to Bidders
                </label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="text"
                    placeholder="message"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={messageToBidders}
                    onChange={(e) => setMessageToBidders(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "Enter any message you want to send to the bidders."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">Category</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="text"
                    placeholder="vehicle"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick("Enter the category of the auction.")
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Upload Documents Section */}
          <div className="w-full md:w-1/3 p-4">
            <span className="text-xl font-semibold mb-4 border-b-2 px-2 border-black">
              Upload Documents
            </span>
            <div className="grid grid-cols-1 gap-4 mt-5">
              <div className="w-full">
                <label
                  htmlFor="images"
                  className="w-full py-4 bg-white border border-black font-bold rounded-md shadow-sm flex justify-center items-center cursor-pointer"
                >
                  Images
                </label>
                <input
                  type="file"
                  id="images"
                  accept=".jpg, .jpeg, .png, .gif, .bmp, .tiff, .webp, .svg, .heic"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setImages, allowedImageTypes)}
                />
                {images && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      {images.name}
                    </p>
                    <button
                      className="text-red-500 font-semibold ml-2"
                      onClick={() => setImages(null)}
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="videos"
                  className="w-full py-4 bg-white border border-black font-bold rounded-md shadow-sm flex justify-center items-center cursor-pointer"
                >
                  Videos
                </label>
                <input
                  type="file"
                  id="videos"
                  accept=".mp4, .avi, .mov, .wmv, .flv, .mkv, .webm, .mpeg, .mpg, .3gp, .m4v"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setVideos, allowedVideoTypes)}
                />
                {videos && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      {videos.name}
                    </p>
                    <button
                      className="text-red-500 font-semibold ml-2"
                      onClick={() => setVideos(null)}
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="provenanceDocuments"
                  className="w-full py-4 bg-white border border-black font-bold rounded-md shadow-sm flex justify-center items-center cursor-pointer"
                >
                  Provenance Documents
                </label>
                <input
                  type="file"
                  id="provenanceDocuments"
                  accept=".pdf, .doc, .docx, .txt"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setProvenanceDocuments, allowedDocumentTypes)}
                />
                {provenanceDocuments && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      {provenanceDocuments.name}
                    </p>
                    <button
                      className="text-red-500 font-semibold ml-2"
                      onClick={() => setProvenanceDocuments(null)}
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="consignorAgreement"
                  className="w-full py-4 bg-white border border-black font-bold rounded-md shadow-sm flex justify-center items-center cursor-pointer"
                >
                  Consignor Agreement
                </label>
                <input
                  type="file"
                  id="consignorAgreement"
                  accept=".pdf, .doc, .docx, .txt"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setConsignorAgreement, allowedDocumentTypes)}
                />
                {consignorAgreement && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      {consignorAgreement.name}
                    </p>
                    <button
                      className="text-red-500 font-semibold ml-2"
                      onClick={() => setConsignorAgreement(null)}
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="termsConditions"
                  className="w-full py-4 bg-white border border-black font-bold rounded-md shadow-sm flex justify-center items-center cursor-pointer"
                >
                  Terms & Conditions
                </label>
                <input
                  type="file"
                  id="termsConditions"
                  accept=".pdf, .doc, .docx, .txt"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setTermsConditions, allowedDocumentTypes)}
                />
                {termsConditions && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      {termsConditions.name}
                    </p>
                    <button
                      className="text-red-500 font-semibold ml-2"
                      onClick={() => setTermsConditions(null)}
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="conditionReport"
                  className="w-full py-4 bg-white border border-black font-bold rounded-md shadow-sm flex justify-center items-center cursor-pointer"
                >
                  Condition Report
                </label>
                <input
                  type="file"
                  id="conditionReport"
                  accept=".pdf, .doc, .docx, .txt"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setConditionReport, allowedDocumentTypes)}
                />
                {conditionReport && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      {conditionReport.name}
                    </p>
                    <button
                      className="text-red-500 font-semibold ml-2"
                      onClick={() => setConditionReport(null)}
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {tooltip && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md">
              <div className="flex justify-end">
                <button
                  onClick={closeTooltip}
                  className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  &times;
                </button>
              </div>
              <p className="text-gray-700">{tooltip}</p>
            </div>
          </div>
        )}

        {/* {error && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md">
              <div className="flex justify-end">
                <button
                  onClick={() => setError(null)}
                  className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  &times;
                </button>
              </div>
              <p className="text-gray-700">{error}</p>
            </div>
          </div>
        )} */}
      </div>

      {/* second view */}
      <div className="mt-2">
        <Details />
      </div>
    </div>
  );
};

export default HostAuction;
