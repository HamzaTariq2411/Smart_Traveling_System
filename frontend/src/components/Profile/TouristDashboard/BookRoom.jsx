import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";
import Loader from "../../../loaders/Loader";
import { baseUrl } from "../../helper";

const BookRoom = ({
  roomDetail,
  setBookRoom,
  checkInDate,
  checkOutDate,
  totalDays,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const bookRoom = async () => {
    setLoading(true);
    const BookingDetails = {
      postedBy: roomDetail.postedBy,
      room: roomDetail.hotelName,
      roomId: roomDetail._id,
      userId: user._id,
      user: user,
      checkInDate,
      checkOutDate,
      totalAmount: totalDays * roomDetail.rentPerDay,
      totalDays,
    };
    try {
      const result = await axios.post(
        `${baseUrl}/api/bookings/bookroom`,
        BookingDetails
      );
      if (result.status === 200) {
        toast.dismiss();
        toast.success("Room Booked Successfully");
        setLoading(false);
        setBookRoom(false);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("Error in BookRoom Component", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ml-14">
      <h1 className="text-center text-4xl my-3">Book here</h1>
      <div className="w-full max-w-md text-black bg-white shadow-lg rounded-lg overflow-hidden">
        {loading ? (
          <Loader />
        ) : error ? (
          <h1 className="text-center py-4">Something went wrong</h1>
        ) : (
          roomDetail && (
            <div>
              <img
                className="w-full h-64 object-cover"
                src={`${baseUrl}/images/${roomDetail?.images?.[0]?.filename}`}
                alt="Room"
              />
              <div className="p-4">
                <h5 className="font-semibold text-lg">
                  {roomDetail?.hotelName}
                </h5>
                <p className="text-sm">
                  <span className="font-semibold">Rent Per Day: </span>
                  {roomDetail?.rentPerDay}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Phone Number: </span>
                  {roomDetail?.phoneNumber}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Room Type: </span>
                  {roomDetail?.roomType}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Check In Date: </span>
                  {checkInDate}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Check Out Date: </span>
                  {checkOutDate}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Total Days: </span>
                  {totalDays}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Total Amount: </span>
                  {totalDays * roomDetail?.rentPerDay} Pkr
                </p>
                <p className="text-sm text-red-600">
                  <span className="font-semibold text-black">Note: </span>
                  You should pay the total bill before 24 hours otherwise your
                  booking will automatically cancel.
                </p>
              </div>
              <div className="p-4 flex justify-between">
                <button
                  onClick={() => setBookRoom(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Back
                </button>
                <button
                  onClick={bookRoom}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {loading ? "Loading..." : "Book room"}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BookRoom;
