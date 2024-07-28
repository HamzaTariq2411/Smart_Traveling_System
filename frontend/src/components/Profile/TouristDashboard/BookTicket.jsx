import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../loaders/Loader";
import { baseUrl } from "../../helper";

const BookTicket = ({ ticketData, setShowModel, fetchData }) => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [flightType, setFlightType] = useState("one-way");
  const [numberOfPassengers, setNumberOfPassengers] = useState(1);
  const [ticketClass, setTicketClass] = useState("");
  const [passengerError, setPassengerError] = useState("");

  useEffect(() => {
    if (!ticketClass) {
      setNumberOfPassengers(1);
    }
  }, [ticketClass]);

  const calculateTotalPrice = () => {
    const multiplier =
      ticketClass === "Business-Class"
        ? 5
        : ticketClass === "Economy-Class"
        ? 2
        : 1;
    return (
      ticketData.price *
      numberOfPassengers *
      (flightType === "one-way" ? 1 : 2) *
      multiplier
    );
  };

  const bookFlight = async () => {
    if (!ticketClass) {
      return toast.dismiss();
      toast.error("Please select the type of ticket");
    }
    if (numberOfPassengers <= 0) {
      return setPassengerError(
        "Number of passengers must be greater than zero"
      );
    }
    setLoading(true);
    const totalPrice = calculateTotalPrice();

    const BookingDetails = {
      user,
      userId: user._id,
      flightId: ticketData._id,
      flight: ticketData,
      bookingDate: new Date(),
      numberOfPassengers,
      departureTime: ticketData.departureTime,
      totalPrice,
      status: "booked",
      flightType,
      postedBy: ticketData.postedBy,
      ticketClass,
    };

    try {
      const result = await axios.post(
        `${baseUrl}/api/bookairlineticket`,
        BookingDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.status === 200) {
        toast.dismiss();
        toast.success("Ticket Booked Successfully");
        fetchData();
        setLoading(false);
        setShowModel(false);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("Error in BookFlight Component", error);
    }
  };

  const handleFlightTypeChange = (event) => {
    setFlightType(event.target.value);
  };

  const handleNumberOfPassengersChange = (event) => {
    const value = Number(event.target.value);
    if (!ticketClass) {
      setPassengerError("Please select a ticket class first");
      return;
    }
    setPassengerError("");
    const maxNumber =
      ticketClass === "Business-Class"
        ? ticketData.businessClass
        : ticketClass === "Economy-Class"
        ? ticketData.economyClass
        : ticketClass === "First-Class"
        ? ticketData.firstClass
        : 0;

    if (value > maxNumber) {
      setPassengerError(
        `Maximum number of passengers for ${ticketClass} is ${maxNumber}`
      );
      setNumberOfPassengers(maxNumber);
    } else if (value <= 0) {
      setPassengerError("Number of passengers must be greater than zero");
      setNumberOfPassengers(1);
    } else {
      setNumberOfPassengers(value);
    }
  };

  const handleTicketClassChange = (event) => {
    setTicketClass(event.target.value);
    setNumberOfPassengers(1);
  };

  const totalPrice = calculateTotalPrice();
  const maxNumber =
    ticketClass === "Business-Class"
      ? ticketData.businessClass
      : ticketClass === "Economy-Class"
      ? ticketData.economyClass
      : ticketClass === "First-Class"
      ? ticketData.firstClass
      : 0;

  return (
    <div className="min-h-screen p-4 ml-10">
      <h1 className="text-center text-4xl my-3">Book here</h1>
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <h1 className="text-center py-4">Something went wrong</h1>
        ) : (
          ticketData && (
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
              <div className="sm:p-3 p-1 flex flex-col gap-4">
                <h5 className="font-semibold sm:text-lg text-base">
                  Airline: {ticketData?.airline}
                </h5>
                <div className="relative border-b-2 border-gray-300 my-3">
                  <select
                    className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
                    required
                    autoComplete="off"
                    name="ticketClass"
                    value={ticketClass}
                    onChange={handleTicketClassChange}
                  >
                    <option className="text-black" value="">
                      Select Ticket Class
                    </option>
                    {ticketData?.businessClass > 0 && (
                      <option className="text-black" value="Business-Class">
                        Business Class
                      </option>
                    )}
                    {ticketData?.economyClass > 0 && (
                      <option className="text-black" value="Economy-Class">
                        Economy Class
                      </option>
                    )}
                    {ticketData?.firstClass > 0 && (
                      <option className="text-black" value="First-Class">
                        First Class
                      </option>
                    )}
                  </select>
                </div>
                <div className="relative border-b-2 border-gray-300 my-3">
                  <select
                    className="bg-transparent outline-none border-none text-xs sm:text-sm md:text-base w-full"
                    required
                    autoComplete="off"
                    name="flightType"
                    value={flightType}
                    onChange={handleFlightTypeChange}
                  >
                    <option className="text-black" value="one-way">
                      One-way
                    </option>
                    <option className="text-black" value="return">
                      Return
                    </option>
                  </select>
                </div>
                <p className="text-xs sm:text-sm">
                  <span className="font-semibold">Departure: </span>
                  {ticketData?.departure}
                </p>
                <p className="text-xs sm:text-sm">
                  <span className="font-semibold">Destination: </span>
                  {ticketData?.destination}
                </p>
                <div className="relative border-b-2 border-gray-300 my-3">
                  <label htmlFor="">Number of Passengers</label>
                  <input
                    className="bg-transparent outline-none border-none text-xs sm:text-sm md:text-base w-full"
                    type="number"
                    placeholder="Number of Passengers"
                    required
                    min="1"
                    max={maxNumber}
                    value={numberOfPassengers}
                    onChange={handleNumberOfPassengersChange}
                    onBlur={handleNumberOfPassengersChange}
                    disabled={!ticketClass}
                  />
                  {passengerError && (
                    <p className="text-red-600 text-xs sm:text-sm">
                      {passengerError}
                    </p>
                  )}
                </div>
                <p className="text-xs sm:text-sm">
                  <span className="font-semibold">Price per Ticket: </span>
                  {ticketData?.price} Pkr
                </p>
                <p className="text-xs sm:text-sm">
                  <span className="font-semibold">Total Price: </span>
                  {totalPrice} Pkr
                </p>
                <p className="text-sm text-red-600">
                  <span className="font-semibold text-white">Note: </span>
                  You should pay the total bill before 24 hours otherwise your
                  booking will automatically cancel.
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 text-white p-2 rounded mr-2"
                  onClick={() => setShowModel(false)}
                >
                  Back
                </button>
                <button
                  className="bg-green-500 text-white p-2 rounded"
                  onClick={bookFlight}
                >
                  {loading ? "Loading...." : "Book Ticket"}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BookTicket;
