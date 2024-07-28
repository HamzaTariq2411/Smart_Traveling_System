import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";
import Loader from "../../../loaders/Loader";
import { baseUrl } from "../../helper";

const MyBookedRooms = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bookedRooms, setBookedRooms] = useState([]);

  const updateBooking = async (e, id) => {
    e.preventDefault();
    const newStatus = e.target.value;
    try {
      const response = await fetch(`${baseUrl}/api/updatebooking/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ booking: newStatus }),
      });

      const result = await response.json();

      if (response.ok) {
        getBookedRooms();
        toast.dismiss();
        toast.success(result.msg || "Booking status updated successfully");
      } else {
        toast.dismiss();
        toast.error(result.msg || "Failed to update booking status");
        console.error("Failed to update booking status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.dismiss();
      toast.error("Error updating booking status");
    }
  };

  const getBookedRooms = useCallback(async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${baseUrl}/api/bookings/mybookedrooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.status === 200) {
        setBookedRooms(result.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error in getBookedRooms Component", error);
      setLoading(false);
      setError(true);
    }
  }, [token]);

  useEffect(() => {
    getBookedRooms();
  }, [getBookedRooms]);

  const handleCancelBooking = async (bookingId) => {
    setLoading(true);
    try {
      const result = await axios.delete(
        `${baseUrl}/api/cancelbooking/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.status === 200) {
        setBookedRooms(bookedRooms.filter((room) => room._id !== bookingId));
        setLoading(false);
        toast.dismiss();
        toast.success("Booking cancelled successfully");
      }
    } catch (error) {
      setLoading(false);
      console.log("Error cancelling booking:", error);
      toast.dismiss();
      toast.error("Error cancelling booking");
    }
  };

  return (
    <div className="h-full ml-14">
      <div className="text-center text-2xl py-5">User's Bookings</div>
      <div className="flex flex-wrap justify-around md:mx-16  mr-4 gap-1 my-5">
        {loading ? (
          <Loader />
        ) : error ? (
          <h1 className="text-center py-4">Something went wrong</h1>
        ) : bookedRooms.length === 0 ? (
          <h1 className="text-center py-4">No booking found</h1>
        ) : (
          bookedRooms.map((room) => {
            const checkInDate = new Date(room.checkInDate);
            const now = new Date();
            const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
            const canCancel = checkInDate - now > oneDayInMilliseconds;

            return (
              <div
                className="flex flex-col bg-white rounded text-black lg:w-2/5 w-auto mt-3"
                key={room?._id}
              >
                <div className="sm:p-3 p-2 flex flex-col gap-1">
                  <h5 className="font-semibold sm:text-lg text-base">
                    {room?.hotelName}
                  </h5>
                  <h5 className="font-semibold sm:text-lg text-base">
                    {room?.room}
                  </h5>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Booked By: </span>
                    {room?.user?.fullName}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Check-In Date: </span>
                    {room?.checkInDate}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Check-Out Date: </span>
                    {room?.checkOutDate}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Total Days: </span>
                    {room?.totalDays}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Total Amount: </span>
                    {room?.totalAmount} Pkr
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Booking Status: </span>
                    <select
                      name="booking"
                      className="border border-slate-950 rounded"
                      onChange={(e) => updateBooking(e, room?._id)}
                      value={room?.booking}
                    >
                      <option value="Cancelled">Cancel</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </p>
                  {canCancel && (
                    <button
                      className="bg-blue-900 rounded p-2 text-white"
                      onClick={() => handleCancelBooking(room?._id)}
                    >
                      {loading ? "Loading..." : "Cancel Booking"}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyBookedRooms;
