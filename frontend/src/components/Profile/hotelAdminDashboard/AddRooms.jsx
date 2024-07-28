import React, { useState } from "react";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";
import { baseUrl } from "../../helper";

const AddRooms = () => {
  const { token } = useAuth();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };
  const [roomData, setRoomData] = useState({
    hotelName: "",
    country: "",
    city: "",
    rentPerDay: "",
    accommodationFor: "",
    description: "",
    phoneNumber: "",
    roomType: "",
    location: "",
    images: [],
  });

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setRoomData({
      ...roomData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("hotelName", roomData.hotelName);
    formData.append("country", roomData.country);
    formData.append("city", roomData.city);
    formData.append("rentPerDay", roomData.rentPerDay);
    formData.append("description", roomData.description);
    formData.append("phoneNumber", roomData.phoneNumber);
    formData.append("maxCount", roomData.accommodationFor);
    formData.append("roomType", roomData.roomType);
    formData.append("location", roomData.location);
    selectedFiles.forEach((file, index) => {
      formData.append("images", file);
    });
    try {
      const response = await fetch(`${baseUrl}/api/postRooms`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const res_data = await response.json();
      if (response.ok === true) {
        setRoomData({
          hotelName: "",
          country: "",
          city: "",
          rentPerDay: "",
          accommodationFor: "",
          description: "",
          phoneNumber: "",
          roomType: "",
          location: "",
          images: [],
        });
        setLoading(false);
        setSelectedFiles([]);
        toast.dismiss();
        toast.success(res_data.msg);
      } else {
        toast.dismiss();
        toast.error(res_data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full">
      <div className="flex justify-center">
        <div className="p-10 ml-5 sm:w-96 w-64">
          <form className="flex flex-col " onSubmit={handleSubmit}>
            <h2 className="md:text-3xl text-lg mb-5 text-center">
              Add Rooms Here
            </h2>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white  sm:text-sm md:text-base ">
              <label htmlFor="hotelName">Hotel Name</label>
              <input
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2 "
                type="text"
                name="hotelName"
                required
                autoComplete="off"
                value={roomData?.hotelName}
                onChange={handleInputs}
                placeholder="Enter Hotel Name"
              />
            </div>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white  sm:text-sm md:text-base ">
              <label htmlFor="hotelName">Country</label>
              <input
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2 "
                type="text"
                name="country"
                required
                autoComplete="off"
                value={roomData?.country}
                onChange={handleInputs}
                placeholder="Enter Hotel Country"
              />
            </div>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white  sm:text-sm md:text-base ">
              <label htmlFor="hotelName">City</label>
              <input
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2 "
                type="text"
                name="city"
                required
                autoComplete="off"
                value={roomData?.city}
                onChange={handleInputs}
                placeholder="Enter Hotel City"
              />
            </div>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white  sm:text-sm md:text-base ">
              <label htmlFor="rentPerDay">Accommodation For person</label>
              <input
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2 "
                type="number"
                required
                autoComplete="off"
                name="accommodationFor"
                value={roomData?.accommodationFor}
                onChange={handleInputs}
                placeholder="Accommodation For person"
              />
            </div>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white  sm:text-sm md:text-base ">
              <label htmlFor="rentPerDay">Rent Per Day</label>
              <input
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2 "
                type="number"
                required
                autoComplete="off"
                name="rentPerDay"
                value={roomData?.rentPerDay}
                onChange={handleInputs}
                placeholder="Enter Rent Per Day"
              />
            </div>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white  sm:text-sm md:text-base ">
              <label htmlFor="description">Room Description</label>
              <textarea
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2 "
                type="string"
                required
                autoComplete="off"
                rows="4"
                name="description"
                value={roomData?.description}
                onChange={handleInputs}
                placeholder="Enter Room Description"
              />
            </div>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white  sm:text-sm md:text-base ">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2 "
                type="number"
                required
                autoComplete="off"
                name="phoneNumber"
                value={roomData?.phoneNumber}
                onChange={handleInputs}
                placeholder="Enter Number "
              />
            </div>
            <div className="relative border-b-2 border-gray-300 my-3">
              <select
                className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
                required
                autoComplete="off"
                name="roomType"
                value={roomData?.roomType}
                onChange={handleInputs}
              >
                <option className="text-black" value="">
                  Select Room Type
                </option>
                <option className="text-black" value="Delux">
                  Delux
                </option>
                <option className="text-black" value="Non Delux">
                  Non Delux
                </option>
              </select>
            </div>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white  sm:text-sm md:text-base ">
              <label htmlFor="hotelName">Location</label>
              <input
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2 "
                type="text"
                name="location"
                required
                autoComplete="off"
                value={roomData?.location}
                onChange={handleInputs}
                placeholder="Enter Hotel location URL"
              />
            </div>
            <div className="flex flex-col my-3">
              <label className="text-left">Choose Images</label>
              <input
                className="bg-white text-black border-none font-semibold text-xs px-3 py-2 md:px-5 md:py-3 rounded-md border-transparent cursor-pointer transition duration-300 ease-in-out hover:text-white hover:border-white hover:bg-opacity-50 hover:bg-black
            my-3 "
                type="file"
                accept="image/jpeg, image/png"
                name="image"
                multiple
                onChange={handleFileChange}
              />
            </div>
            <div>
              <button
                className="bg-white text-black border-none font-semibold text-xs px-3 py-2 md:px-5 md:py-3 rounded-md border-transparent cursor-pointer transition duration-300 mt-2 ease-in-out hover:text-white hover:border-white hover:bg-opacity-50 hover:bg-black"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading...." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRooms;
