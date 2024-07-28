import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";
import Loader from "../../../loaders/Loader";
import { baseUrl } from "../../helper";

const BookedTickets = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [myBookings, setMyBookings] = useState([]);

  const getMyBookings = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `${baseUrl}/api/bookings/myticketsbookings`,
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
        toast.dismiss();
        toast.success("Booking Cancelled Successfully");
        setMyBookings(
          myBookings.filter((booking) => booking?._id !== bookingId)
        );
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
      console.log("Error cancelling booking:", error);
    }
  };

  return (
    <div className="min-h-screen ml-14 bg-transparent">
      <div className="text-center text-2xl py-5">My Bookings</div>
      <div className="flex flex-wrap justify-around md:mx-16 mr-4 gap-1 my-5">
        {loading ? (
          <Loader />
        ) : error ? (
          <h1 className="text-center py-4">Something went wrong</h1>
        ) : myBookings.length === 0 ? (
          <h1 className="text-center py-4">No bookings found</h1>
        ) : (
          myBookings?.map((booking) => {
            const departureTime = new Date(booking.departureTime);
            const now = new Date();
            const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
            const canCancel = departureTime - now > oneDayInMilliseconds;
            const hasDeparted = departureTime <= now;

            return (
              <div
                className="flex flex-col bg-white rounded text-black lg:w-2/5 w-4/5 mt-3 shadow-lg"
                key={booking?._id}
              >
                <div className="sm:p-3 p-2 flex flex-col gap-1">
                  <h5 className="font-semibold sm:text-lg text-base">
                    {booking?.flight?.airline}
                  </h5>
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
                    <span className="font-semibold">Booking Date: </span>
                    {new Date(booking?.bookingDate).toLocaleString()}
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
                  <p className="text-xs sm:text-sm text-red-600">
                    <span className="font-semibold text-black">
                      Booking Status:{" "}
                    </span>
                    {booking?.booking}
                  </p>
                  {!hasDeparted && (
                    <div className="flex flex-col gap-1 sm:gap-0 sm:flex-row sm:items-center justify-between text-xs">
                      {canCancel ? (
                        <button
                          className="bg-blue-900 text-white rounded p-2 mt-2 sm:mt-0"
                          onClick={() => handleCancelBooking(booking?._id)}
                        >
                          Cancel Booking
                        </button>
                      ) : (
                        <p className="text-red-500 mt-2 sm:mt-0">
                          To cancel your booking, please visit the airport.
                        </p>
                      )}
                    </div>
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

export default BookedTickets;
