import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";
import Loader from "../../../loaders/Loader";
import { baseUrl } from "../../helper";

const BookedRooms = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [myBookings, setMyBookings] = useState([]);

  const getMyBookings = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${baseUrl}/api/bookings/mybookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        `${baseUrl}/api/cancelbooking/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.status === 200) {
        setMyBookings(
          myBookings.filter((booking) => booking?._id !== bookingId)
        );
        toast.dismiss();
        toast.success("Booking Cancelled Successfully");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
      console.log("Error cancelling booking:", error);
    }
  };

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(year, month - 1, day); // Month is zero-indexed
  };

  return (
    <div className="min-h-svh">
      <div className="text-center text-2xl py-5">My Booking</div>
      <div className="flex flex-wrap justify-around md:mx-16 ml-14 mr-4 gap-1 my-5">
        {loading ? (
          <Loader />
        ) : error ? (
          <h1 className="text-center py-4">Something went wrong</h1>
        ) : myBookings.length === 0 ? (
          <h1 className="text-center py-4">No bookings found</h1>
        ) : (
          myBookings?.map((booking) => {
            const checkInDate = parseDate(booking?.checkInDate);
            const now = new Date();
            const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

            const canCancel = checkInDate - now > oneDayInMilliseconds;

            const hasCheckedIn = checkInDate <= now;

            return (
              <div
                className="flex flex-col bg-white rounded text-black lg:w-2/5 w-4/5 mt-3"
                key={booking?._id}
              >
                <div className="sm:p-3 p-1 flex flex-col gap-1">
                  <h5 className="font-semibold sm:text-lg text-base">
                    {booking?.room}
                  </h5>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Check-In Date: </span>
                    {checkInDate?.toLocaleDateString()}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Check-Out Date: </span>
                    {parseDate(booking?.checkOutDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Total Days: </span>
                    {booking?.totalDays}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Total Amount: </span>
                    {booking?.totalAmount} Pkr
                  </p>
                  <p className="text-xs sm:text-sm text-red-600">
                    <span className="font-semibold text-black">
                      Booking Status:{" "}
                    </span>
                    {booking?.booking}
                  </p>
                  {!hasCheckedIn && (
                    <div className="flex flex-col gap-1 sm:gap-0 sm:flex-row sm:items-center justify-between text-xs">
                      {canCancel ? (
                        <button
                          className="bg-blue-900 rounded p-2"
                          onClick={() => handleCancelBooking(booking?._id)}
                        >
                          Cancel Booking
                        </button>
                      ) : (
                        <p className="text-red-500 mt-2 sm:mt-0">
                          To cancel your booking, please visit the hotel.
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

export default BookedRooms;
