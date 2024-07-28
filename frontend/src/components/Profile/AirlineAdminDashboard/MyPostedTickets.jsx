import React, { useEffect, useState } from "react";
import { useAuth } from "../../../store/auth";
import EditTicketModal from "./EditTicketModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { toast } from "react-toastify";
import Loader from "../../../loaders/Loader";
import { baseUrl } from "../../helper";

const MyPostedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user, token } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/getMyPostedTickets`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
        setLoading(false);
      } else {
        console.error("Failed to fetch data:", response.statusText);
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleDeleteTicket = (ticket) => {
    setTicketToDelete(ticket);
    setShowDeleteModal(true);
  };

  const confirmDeleteTicket = async () => {
    if (!ticketToDelete) return;

    try {
      const response = await fetch(
        `${baseUrl}/api/deleteTicket/${ticketToDelete?._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        toast.dismiss();
        toast.success("Ticket Deleted Successfully");
        fetchData();
        setShowDeleteModal(false);
        setTicketToDelete(null);
      } else {
        toast.dismiss();
        toast.error("Something went wrong");
        console.error("Failed to delete ticket:", response.statusText);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <>
      {showEditModal && currentTicket && (
        <EditTicketModal
          ticket={currentTicket}
          setShowEditModal={setShowEditModal}
          fetchData={fetchData}
        />
      )}
      <ConfirmDeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteTicket}
      />
      <div className="h-full ml-14">
        <div className="text-center text-2xl py-5">My Posted Tickets</div>
        <div className="flex flex-col sm:flex-row justify-around gap-5 py-3 px-16">
          <div className="sm:w-11/12 w-auto">
            <input
              className="w-full h-10 bg-transparent border-solid border-2 border-zinc-800 rounded p-2 bg-opacity-90 backdrop-filter  text-xs sm:text-sm md:text-base"
              type="text"
              placeholder="Search By Name"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-around md:mx-16 mr-4 gap-1 my-5">
          {loading ? (
            <Loader />
          ) : error ? (
            <h1 className="text-center py-4">Something went wrong</h1>
          ) : tickets.length === 0 ? (
            <h1 className="text-center py-4">No ticket found</h1>
          ) : (
            tickets.map((ticket) => (
              <div
                className="flex flex-col bg-white rounded text-black lg:w-2/5 w-auto mt-3"
                key={ticket?._id}
              >
                <div className="sm:p-3 p-2 flex flex-col gap-1">
                  <h5 className="font-semibold sm:text-lg text-base">
                    {ticket?.airline}
                  </h5>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Departure: </span>
                    {ticket?.departure}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Destination: </span>
                    {ticket?.destination}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Departure Time: </span>
                    {new Date(ticket?.departureTime)?.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Arrival Time: </span>
                    {new Date(ticket?.arrivalTime)?.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Economy Class Seats: </span>
                    {ticket?.economyClass}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">
                      Business Class Seats:{" "}
                    </span>
                    {ticket?.businessClass}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">First Class Seats: </span>
                    {ticket?.firstClass}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Price: </span>
                    {ticket?.price} Pkr
                  </p>
                  <div className="flex flex-col gap-1 sm:gap-0 sm:flex-row sm:items-center justify-between text-xs">
                    <div className="flex gap-1">
                      {user?.role === "Tourist" ? (
                        <></>
                      ) : (
                        <>
                          <button
                            className="bg-blue-900 rounded p-2"
                            onClick={() => {
                              setCurrentTicket(ticket);
                              setShowEditModal(true);
                            }}
                          >
                            Update Details
                          </button>
                          <button
                            className="bg-red-700 rounded p-2"
                            onClick={() => handleDeleteTicket(ticket)}
                          >
                            Delete Ticket
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyPostedTickets;
