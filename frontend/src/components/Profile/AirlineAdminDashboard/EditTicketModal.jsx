import React, { useState, useRef } from "react";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";
import { baseUrl } from "../../helper";

const EditTicketModal = ({
  ticket,
  setShowEditModal,
  updateTicketList,
  fetchData,
}) => {
  const [departure, setDeparture] = useState(ticket.departure);
  const [destination, setDestination] = useState(ticket.destination);
  const [departureTime, setDepartureTime] = useState(ticket.departureTime);
  const [arrivalTime, setArrivalTime] = useState(ticket.arrivalTime);
  const [price, setPrice] = useState(ticket.price);
  const [economyClass, setEconomyClass] = useState(ticket.economyClass);
  const [businessClass, setBusinessClass] = useState(ticket.businessClass);
  const [firstClass, setFirstClass] = useState(ticket.firstClass);
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const departureTimeRef = useRef(null);
  const arrivalTimeRef = useRef(null);

  const handleSave = async () => {
    if (new Date(arrivalTime) < new Date(departureTime)) {
      toast.dismiss();
      toast.error("Arrival time cannot be earlier than departure time");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/api/updateTicket/${ticket._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            departure,
            destination,
            departureTime,
            arrivalTime,
            price,
            economyClass,
            businessClass,
            firstClass,
          }),
        }
      );

      if (response.ok) {
        setLoading(false);
        toast.dismiss();
        toast.success("Ticket Details Updated Successfully");
        fetchData();
        setShowEditModal(false);
      } else {
        setLoading(false);
        console.error("Failed to update ticket:", response.statusText);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating ticket:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-80 flex items-center justify-center py-5 text-black ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-full overflow-y-auto ml-14">
        <h2 className="sm:text-2xl text-xl font-semibold mb-4">
          Update Ticket Details
        </h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="font-semibold mb-1">Departure</span>
            <input
              className="border border-gray-300 p-2 rounded"
              type="text"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              placeholder="Departure"
            />
          </label>
          <label className="flex flex-col">
            <span className="font-semibold mb-1">Destination</span>
            <input
              className="border border-gray-300 p-2 rounded"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination"
            />
          </label>
          <label className="flex flex-col">
            <span className="font-semibold mb-1">Departure Time</span>
            <input
              ref={departureTimeRef}
              className="border border-gray-300 p-2 rounded"
              type="text"
              value={new Date(departureTime)?.toISOString()?.substring(0, 16)}
              onChange={(e) => setDepartureTime(e.target.value)}
              placeholder="Departure Time"
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
          </label>
          <label className="flex flex-col">
            <span className="font-semibold mb-1">Arrival Time</span>
            <input
              ref={arrivalTimeRef}
              className="border border-gray-300 p-2 rounded"
              type="text"
              value={new Date(arrivalTime)?.toISOString()?.substring(0, 16)}
              onChange={(e) => setArrivalTime(e.target.value)}
              placeholder="Arrival Time"
              disabled={!departureTime}
              min={departureTime}
              onFocus={(event) => {
                event.target.type = "datetime-local";
                event.target.min =
                  departureTime || new Date()?.toISOString()?.slice(0, 16); // Prevent selecting previous dates and set min to departureTime
                setTimeout(() => arrivalTimeRef?.current?.showPicker(), 0); // Show the date picker
              }}
              onBlur={(event) => {
                if (!event.target.value) {
                  event.target.type = "text";
                }
              }}
            />
          </label>
          <label className="flex flex-col">
            <span className="font-semibold mb-1">Price</span>
            <input
              className="border border-gray-300 p-2 rounded"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </label>
          <label className="flex flex-col">
            <span className="font-semibold mb-1">Economy Class Seats</span>
            <input
              className="border border-gray-300 p-2 rounded"
              type="number"
              value={economyClass}
              onChange={(e) => setEconomyClass(e.target.value)}
              placeholder="Economy Class Seats"
            />
          </label>
          <label className="flex flex-col">
            <span className="font-semibold mb-1">Business Class Seats</span>
            <input
              className="border border-gray-300 p-2 rounded"
              type="number"
              value={businessClass}
              onChange={(e) => setBusinessClass(e.target.value)}
              placeholder="Business Class Seats"
            />
          </label>
          <label className="flex flex-col">
            <span className="font-semibold mb-1">First Class Seats</span>
            <input
              className="border border-gray-300 p-2 rounded"
              type="number"
              value={firstClass}
              onChange={(e) => setFirstClass(e.target.value)}
              placeholder="First Class Seats"
            />
          </label>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {loading ? "Loading..." : "Update"}
          </button>
          <button
            onClick={() => setShowEditModal(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTicketModal;
