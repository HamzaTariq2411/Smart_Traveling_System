import React, { useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";
import { baseUrl } from "../../helper";

const AddTickets = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState({
    airline: "",
    departure: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    economyClass: "",
    firstClass: "",
    businessClass: "",
    price: "",
  });

  const departureTimeRef = useRef(null);
  const arrivalTimeRef = useRef(null);

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTicketData({
      ...ticketData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.keys(ticketData).forEach((key) => {
      formData.append(key, ticketData[key]);
    });

    try {
      const response = await axios.post(`${baseUrl}/api/postTicket`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setLoading(false);
        setTicketData({
          airline: "",
          departure: "",
          destination: "",
          departureTime: "",
          arrivalTime: "",
          economyClass: "",
          firstClass: "",
          businessClass: "",
          price: "",
        });
        toast.dismiss();
        toast.success("Ticket Posted Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("An error occurred while submitting the form");
    }
  };

  return (
    <div className="h-full">
      <div className="flex justify-center">
        <div className="p-10 ml-5 sm:w-96 w-64">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <h2 className="md:text-3xl text-lg mb-5 text-center">
              Add Tickets Here
            </h2>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white sm:text-sm md:text-base">
              <label htmlFor="airline">Airline</label>
              <input
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2"
                type="text"
                name="airline"
                required
                autoComplete="off"
                value={ticketData?.airline}
                onChange={handleInputs}
                placeholder="Enter Airline Name"
              />
            </div>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white sm:text-sm md:text-base">
              <label htmlFor="departure">Departure</label>
              <input
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2"
                type="text"
                name="departure"
                required
                autoComplete="off"
                value={ticketData?.departure}
                onChange={handleInputs}
                placeholder="Enter Departure Location"
              />
            </div>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white sm:text-sm md:text-base">
              <label htmlFor="destination">Destination</label>
              <input
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2"
                type="text"
                name="destination"
                required
                autoComplete="off"
                value={ticketData?.destination}
                onChange={handleInputs}
                placeholder="Enter Destination"
              />
            </div>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white sm:text-sm md:text-base">
              <label htmlFor="departureTime">Departure Time</label>
              <input
                ref={departureTimeRef}
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2"
                type="text"
                name="departureTime"
                required
                autoComplete="off"
                value={ticketData?.departureTime}
                onChange={handleInputs}
                placeholder="Select Departure Time"
                onFocus={(event) => {
                  event.target.type = "datetime-local";
                  event.target.min = new Date()?.toISOString()?.slice(0, 16); // Prevent selecting previous dates
                  setTimeout(() => departureTimeRef?.current?.showPicker(), 0); // Show the date picker
                }}
                onBlur={(event) => {
                  if (!event.target.value) {
                    event.target.type = "text";
                  }
                }}
              />
            </div>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white sm:text-sm md:text-base">
              <label htmlFor="arrivalTime">Arrival Time</label>
              <input
                ref={arrivalTimeRef}
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2"
                type="text"
                name="arrivalTime"
                required
                autoComplete="off"
                value={ticketData?.arrivalTime}
                onChange={handleInputs}
                placeholder="Select Arrival Time"
                disabled={!ticketData.departureTime}
                min={ticketData?.departureTime}
                onFocus={(event) => {
                  event.target.type = "datetime-local";
                  event.target.min =
                    ticketData?.departureTime ||
                    new Date()?.toISOString()?.slice(0, 16); // Prevent selecting previous dates and set min to departureTime
                  setTimeout(() => arrivalTimeRef?.current?.showPicker(), 0); // Show the date picker
                }}
                onBlur={(event) => {
                  if (!event.target.value) {
                    event.target.type = "text";
                  }
                }}
              />
            </div>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white sm:text-sm md:text-base">
              <label htmlFor="economyClass">Economy Class Seats</label>
              <input
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2"
                type="number"
                required
                autoComplete="off"
                name="economyClass"
                value={ticketData?.economyClass}
                onChange={handleInputs}
                placeholder="Enter Economy Class Seats"
              />
            </div>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white sm:text-sm md:text-base">
              <label htmlFor="businessClass">Business Class Seats</label>
              <input
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2"
                type="number"
                required
                autoComplete="off"
                name="businessClass"
                value={ticketData?.businessClass}
                onChange={handleInputs}
                placeholder="Enter Business Class Seats"
              />
            </div>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white sm:text-sm md:text-base">
              <label htmlFor="firstClass">First Class Seats</label>
              <input
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2"
                type="number"
                required
                autoComplete="off"
                name="firstClass"
                value={ticketData?.firstClass}
                onChange={handleInputs}
                placeholder="Enter First Class Seats"
              />
            </div>
            <div className="relative my-3 flex flex-col gap-2 text-xs text-white sm:text-sm md:text-base">
              <label htmlFor="price">Price</label>
              <input
                className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2"
                type="number"
                required
                autoComplete="off"
                name="price"
                value={ticketData?.price}
                onChange={handleInputs}
                placeholder="Enter Ticket Price"
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

export default AddTickets;
