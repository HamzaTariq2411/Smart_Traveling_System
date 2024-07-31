import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";
import Loader from "../../../loaders/Loader";
import { baseUrl } from "../../helper";

const AllBookedTickets = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [myBookings, setMyBookings] = useState([]);

  const updateBooking = async (e, id) => {
    e.preventDefault();
    const newStatus = e.target.value;
    try {
      const response = await fetch(`${baseUrl}/api/updateTicketBooking/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ booking: newStatus }),
      });

      const result = await response.json();

      if (response.ok) {
        getMyBookings();
        toast.dismiss();
        toast.success(result?.msg || "Booking status updated successfully");
      } else {
        toast.dismiss();
        toast.error(result?.msg || "Failed to update booking status");
        console.error("Failed to update booking status:", response?.statusText);
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.dismiss();
      toast.error("Error updating booking status");
    }
  };

  const getMyBookings = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `${baseUrl}/api/bookings/mybookedtickets`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.status === 200) {
        setMyBookings(result.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error in MyBookings Component", error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    setLoading(true);
    try {
      const result = await axios.delete(
        `${baseUrl}/api/cancelticket/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.status === 200) {
        setMyBookings(
          myBookings.filter((booking) => booking._id !== bookingId)
        );
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error cancelling booking:", error);
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
        ) : myBookings.length === 0 ? (
          <h1 className="text-center py-4">No booking found</h1>
        ) : (
          myBookings.map((booking) => {
            const departureTime = new Date(booking.departureTime);
            const now = new Date();
            const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
            const canCancel = departureTime - now > oneDayInMilliseconds;

            return (
              <div
                className="flex flex-col bg-white rounded text-black lg:w-2/5 w-auto mt-3 shadow-lg"
                key={booking?._id}
              >
                <div className="sm:p-3 p-2 flex flex-col gap-1">
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">User: </span>
                    {booking?.user.fullName}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Flight Type: </span>
                    {booking?.flightType}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Ticket Class: </span>
                    {booking?.ticketClass}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Departure: </span>
                    {booking?.flight.departure}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Destination: </span>
                    {booking?.flight.destination}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Booking Date: </span>
                    {new Date(booking?.bookingDate)?.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Departure Date: </span>
                    {departureTime?.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">
                      Number of Passengers:{" "}
                    </span>
                    {booking?.numberOfPassengers}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Total Price: </span>
                    {booking?.totalPrice} Pkr
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Booking Status: </span>
                    <select
                      name="booking"
                      className="border border-slate-950 rounded"
                      onChange={(e) => updateBooking(e, booking?._id)}
                      value={booking?.booking}
                    >
                      <option value="Cancelled">Cancel</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </p>
                  <div className="flex flex-col gap-1 sm:gap-0 sm:flex-row sm:items-center justify-between text-xs">
                    {canCancel && (
                      <button
                        className="bg-blue-900 text-white rounded p-2 mt-2 sm:mt-0"
                        onClick={() => handleCancelBooking(booking?._id)}
                      >
                        {loading ? "Loading..." : "Cancel Booking"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllBookedTickets;
