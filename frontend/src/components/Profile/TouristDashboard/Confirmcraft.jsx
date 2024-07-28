import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../store/auth";
import BookTicket from "./BookTicket";
import Loader from "../../../loaders/Loader";
import { baseUrl } from "../../helper";

const Confirmcraft = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketData, setTicketData] = useState({});
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { token } = useAuth();
  const [showModel, setShowModel] = useState(false);
  const departureDateRef = useRef(null);

  const [searchCriteria, setSearchCriteria] = useState({
    departure: "",
    destination: "",
    date: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/getalltickets`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
        setFilteredTickets(data);
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

  useEffect(() => {
    const filterTickets = () => {
      const filtered = tickets.filter((ticket) => {
        const currentDateTime = new Date();
        const departureTime = new Date(ticket.departureTime);

        const matchesDeparture =
          searchCriteria.departure === "" ||
          ticket.departure
            .toLowerCase()
            .includes(searchCriteria.departure.toLowerCase());
        const matchesDestination =
          searchCriteria.destination === "" ||
          ticket.destination
            .toLowerCase()
            .includes(searchCriteria.destination.toLowerCase());
        const matchesDate =
          searchCriteria.date === "" ||
          new Date(ticket.departureTime).toISOString().split("T")[0] ===
            searchCriteria.date;
        const matchesMinPrice =
          searchCriteria.minPrice === "" ||
          ticket.price >= Number(searchCriteria.minPrice);
        const matchesMaxPrice =
          searchCriteria.maxPrice === "" ||
          ticket.price <= Number(searchCriteria.maxPrice);
        const hasAvailableSeats =
          ticket.businessClass > 0 ||
          ticket.economyClass > 0 ||
          ticket.firstClass > 0;
        const isFutureDeparture = departureTime >= currentDateTime;

        return (
          matchesDeparture &&
          matchesDestination &&
          matchesDate &&
          matchesMinPrice &&
          matchesMaxPrice &&
          hasAvailableSeats &&
          isFutureDeparture
        );
      });
      setFilteredTickets(filtered);
    };

    filterTickets();
  }, [searchCriteria, tickets]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearDate = () => {
    setSearchCriteria((prevState) => ({ ...prevState, date: "" }));
  };

  return (
    <>
      {showModel ? (
        <BookTicket
          ticketData={ticketData}
          setShowModel={setShowModel}
          fetchData={fetchData}
        />
      ) : (
        <div className="bg-transparent ml-14">
          <div className="text-center text-2xl py-5">Find Best Ticket Here</div>
          <div className="flex flex-col sm:flex-row justify-around gap-5 py-3 px-16">
            <div className="sm:w-1/4 w-auto">
              <input
                className="w-full h-10 bg-transparent border-solid border-2 border-zinc-800 rounded p-2 bg-opacity-90 backdrop-filter backdrop-blur-3xl text-xs sm:text-sm md:text-base"
                type="text"
                name="departure"
                placeholder="From"
                value={searchCriteria?.departure}
                onChange={handleChange}
              />
            </div>
            <div className="sm:w-1/4 w-auto">
              <input
                className="w-full h-10 bg-transparent border-solid border-2 border-zinc-800 rounded p-2 bg-opacity-90 backdrop-filter backdrop-blur-3xl text-xs sm:text-sm md:text-base"
                type="text"
                name="destination"
                placeholder="To"
                value={searchCriteria?.destination}
                onChange={handleChange}
              />
            </div>
            <div className="sm:w-1/4 w-auto flex items-center">
              <input
                ref={departureDateRef}
                className="w-full h-10 bg-transparent border-solid border-2 border-zinc-800 rounded p-2 bg-opacity-90 backdrop-filter backdrop-blur-3xl text-xs sm:text-sm md:text-base"
                type="text"
                name="date"
                placeholder="Departure Date"
                value={searchCriteria?.date}
                onFocus={(event) => {
                  event.target.type = "date";
                  event.target.min = new Date()?.toISOString()?.split("T")[0];
                  setTimeout(() => departureDateRef?.current?.showPicker(), 0);
                }}
                onBlur={(event) => {
                  if (!event.target.value) {
                    event.target.type = "text";
                  }
                }}
                onChange={handleChange}
              />
              {searchCriteria?.date && (
                <button
                  className="ml-2 bg-red-600 text-white p-2 rounded"
                  onClick={clearDate}
                >
                  Clear
                </button>
              )}
            </div>
            <div className="sm:w-1/4 w-auto">
              <input
                className="w-full h-10 bg-transparent border-solid border-2 border-zinc-800 rounded p-2 bg-opacity-90 backdrop-filter backdrop-blur-3xl text-xs sm:text-sm md:text-base"
                type="number"
                name="minPrice"
                placeholder="Min Price"
                value={searchCriteria?.minPrice}
                onChange={handleChange}
              />
            </div>
            <div className="sm:w-1/4 w-auto">
              <input
                className="w-full h-10 bg-transparent border-solid border-2 border-zinc-800 rounded p-2 bg-opacity-90 backdrop-filter backdrop-blur-3xl text-xs sm:text-sm md:text-base"
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                value={searchCriteria?.maxPrice}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-around md:mx-16 mr-4 gap-1 my-5">
            {loading ? (
              <Loader />
            ) : error ? (
              <h1 className="text-center py-4">Something went wrong</h1>
            ) : filteredTickets.length === 0 ? (
              <h1 className="text-center py-4">No ticket found</h1>
            ) : (
              filteredTickets?.map((ticket) => (
                <div
                  className="flex flex-col bg-white rounded text-black lg:w-2/5 w-4/5 mt-3"
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
                    {ticket?.firstClass > 0 && (
                      <p className="text-xs sm:text-sm">
                        <span className="font-semibold">
                          First Class Seats:{" "}
                        </span>
                        {ticket?.firstClass}
                      </p>
                    )}
                    {ticket?.businessClass > 0 && (
                      <p className="text-xs sm:text-sm">
                        <span className="font-semibold">
                          Business Class Seats:{" "}
                        </span>
                        {ticket?.businessClass}
                      </p>
                    )}
                    {ticket?.economyClass > 0 && (
                      <p className="text-xs sm:text-sm">
                        <span className="font-semibold">
                          Economy Class Seats:{" "}
                        </span>
                        {ticket?.economyClass}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm">
                      <span className="font-semibold">Price: </span>
                      {ticket?.price} Pkr
                    </p>
                    <div className="text-xs">
                      <div className="flex gap-1">
                        <button
                          className="bg-blue-900 rounded p-2"
                          onClick={() => {
                            setShowModel(true);
                            setTicketData(ticket);
                          }}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Confirmcraft;
