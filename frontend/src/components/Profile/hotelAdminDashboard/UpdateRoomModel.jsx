import React, { useState } from "react";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";
import { baseUrl } from "../../helper";

const UpdateRoomModel = ({ room, setShowUpdateModel, fetchData }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    hotelName: room.hotelName,
    country: room.country,
    city: room.city,
    rentPerDay: room.rentPerDay,
    maxCount: room.maxCount,
    description: room.description,
    phoneNumber: room.phoneNumber,
    roomType: room.roomType,
    location: room.location,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/updateRoom/${room._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchData();
        setLoading(false);
        toast.dismiss();
        toast.success("Room Details Update Successfully");
        setShowUpdateModel(false);
      } else {
        setLoading(false);
        console.error("Failed to update room details:", response.statusText);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating room details:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-80 flex items-center justify-center py-5">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-full overflow-y-auto ml-14 mx-2">
        <h2 className="sm:text-2xl text-xl font-semibold mb-4 text-black">
          Update Room Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hotel Name
            </label>
            <input
              type="text"
              name="hotelName"
              value={formData?.hotelName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData?.country}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData?.city}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rent Per Day
            </label>
            <input
              type="number"
              name="rentPerDay"
              value={formData?.rentPerDay}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Accommodation For
            </label>
            <input
              type="number"
              name="maxCount"
              value={formData?.maxCount}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              value={formData?.description}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData?.phoneNumber}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Type
            </label>
            <select
              className="w-full p-2 h-10 bg-transparent border border-gray-300 rounded-md shadow-sm text-xs  sm:text-sm md:text-base"
              required
              name="roomType"
              value={formData?.roomType}
              onChange={handleChange}
            >
              <option className="text-black" value="Delux">
                Delux
              </option>
              <option className="text-black" value="Non Delux">
                Non Delux
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData?.location}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
            >
              {loading ? "Loading..." : "Update"}
            </button>
            <button
              type="button"
              onClick={() => setShowUpdateModel(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoomModel;
