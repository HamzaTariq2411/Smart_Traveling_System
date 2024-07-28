import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import RoomDetailModel from "./RoomDetailModel";
import BookRoom from "./BookRoom";
import Loader from "../../../loaders/Loader";
import { baseUrl } from "../../helper";

const Confirmhotel = () => {
  const { user, token } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [roomDetail, setRoomDetail] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [bookRoom, setBookRoom] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const calculateDaysBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
  };

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const days = calculateDaysBetweenDates(checkInDate, checkOutDate);
      setTotalDays(days + 1);
    }
    filterRooms();
  }, [
    checkInDate,
    checkOutDate,
    searchName,
    searchLocation,
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/getallrooms`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setRooms(data);
          setFilteredRooms(data); // Initialize filteredRooms with all rooms
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
    fetchData();
  }, []);

  const toggleShowModel = (room) => {
    setRoomDetail(room);
    setShowModel(true);
  };

  const filterRooms = () => {
    let tempRooms = rooms;

    if (checkInDate && checkOutDate) {
      tempRooms = tempRooms.filter((room) => {
        const checkIn = formatDate(checkInDate);
        const checkOut = formatDate(checkOutDate);

        const isAvailable = room.currentBooking.every((booking) => {
          const bookingCheckIn = booking.checkInDate;
          const bookingCheckOut = booking.checkOutDate;

          return checkOut <= bookingCheckIn || checkIn >= bookingCheckOut;
        });

        return isAvailable || room.currentBooking.length === 0;
      });
    }

    if (searchName) {
      tempRooms = tempRooms.filter((room) =>
        room.hotelName.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchLocation) {
      tempRooms = tempRooms.filter((room) => {
        const locationMatch =
          room.city?.toLowerCase().includes(searchLocation.toLowerCase()) ||
          room.country?.toLowerCase().includes(searchLocation.toLowerCase());
        return locationMatch;
      });
    }

    if (minPrice) {
      tempRooms = tempRooms.filter((room) => room.rentPerDay >= minPrice);
    }

    if (maxPrice) {
      tempRooms = tempRooms.filter((room) => room.rentPerDay <= maxPrice);
    }

    setFilteredRooms(tempRooms);
  };

  const handleCheckInChange = (e) => {
    const newCheckInDate = e.target.value;
    if (newCheckInDate > checkOutDate) {
      setCheckOutDate(""); // Reset check-out date if new check-in date is after current check-out date
    }
    setCheckInDate(newCheckInDate);
    document.getElementById("check-out-date").min = newCheckInDate; // Update min attribute for check-out date
  };

  const resetDates = () => {
    setCheckInDate("");
    setCheckOutDate("");
    setTotalDays(0);
  };

  return (
    <>
      {bookRoom ? (
        <BookRoom
          roomDetail={roomDetail}
          setBookRoom={(value) => {
            setBookRoom(value);
            if (!value) resetDates(); // Reset dates when closing BookRoom
          }}
          checkInDate={formatDate(checkInDate)}
          checkOutDate={formatDate(checkOutDate)}
          totalDays={totalDays}
        />
      ) : (
        <>
          {showModel && (
            <div className="z-20 top-0 left-0 right-0 fixed">
              <div
                className="bg-black bg-opacity-80 h-full w-full fixed"
                onClick={() => {
                  setShowModel(false);
                }}
              ></div>
              <RoomDetailModel setShowModel={setShowModel} room={roomDetail} />
            </div>
          )}
          <div className="bg-transparent ml-12">
            <div className="text-center text-2xl py-5">
              Find Best Rooms Here
            </div>
            <div className="flex flex-col lg:flex-row justify-around gap-5 py-3 px-16">
              <div className="w-auto">
                <input
                  className="w-full h-10 bg-transparent border-solid border-2 border-zinc-800 rounded p-2 bg-opacity-90 backdrop-filter backdrop-blur-3xl text-xs sm:text-sm md:text-base"
                  type="text"
                  placeholder="Search By Name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className=" w-auto flex flex-col lg:flex-row gap-4">
                <div>
                  <input
                    ref={checkInRef}
                    id="check-in-date"
                    className="w-full h-10 bg-transparent border-solid border-2 border-zinc-800 rounded p-2 bg-opacity-90 backdrop-filter backdrop-blur-3xl text-xs sm:text-sm md:text-base"
                    type="text"
                    placeholder="Check In Date"
                    onFocus={(event) => {
                      event.target.type = "date";
                      event.target.min = new Date()
                        ?.toISOString()
                        ?.split("T")[0]; // Prevent selecting previous dates
                      setTimeout(() => checkInRef?.current?.showPicker(), 0); // Show the date picker
                    }}
                    required
                    onBlur={(event) => {
                      if (!event.target.value) {
                        event.target.type = "text";
                      }
                    }}
                    onChange={handleCheckInChange}
                  />
                </div>
                <div>
                  <input
                    ref={checkOutRef}
                    id="check-out-date"
                    className="w-full h-10 bg-transparent border-solid border-2 border-zinc-800 rounded p-2 bg-opacity-90 backdrop-filter backdrop-blur-3xl text-xs sm:text-sm md:text-base"
                    type="text"
                    placeholder="Check Out Date"
                    disabled={!checkInDate}
                    onFocus={(event) => {
                      event.target.type = "date";
                      if (checkInDate) {
                        event.target.min = checkInDate; // Prevent selecting previous dates from check-in date
                      }
                      setTimeout(() => checkOutRef?.current?.showPicker(), 0); // Show the date picker
                    }}
                    required
                    onBlur={(event) => {
                      if (!event.target.value) {
                        event.target.type = "text";
                      }
                    }}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    value={checkOutDate} // Ensure the check-out date input reflects the state
                  />
                </div>
              </div>
              <div className="w-auto">
                <input
                  className="w-full h-10 bg-transparent border-solid border-2 border-zinc-800 rounded p-2 bg-opacity-90 backdrop-filter backdrop-blur-3xl text-xs sm:text-sm md:text-base"
                  type="text"
                  placeholder="Search By City/Country"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <div className=" w-auto">
                <input
                  className="w-full h-10 bg-transparent border-solid border-2 border-zinc-800 rounded p-2 bg-opacity-90 backdrop-filter backdrop-blur-3xl text-xs sm:text-sm md:text-base"
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className=" w-auto">
                <input
                  className="w-full h-10 bg-transparent border-solid border-2 border-zinc-800 rounded p-2 bg-opacity-90 backdrop-filter backdrop-blur-3xl text-xs sm:text-sm md:text-base"
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-around md:mx-16  mr-4 gap-2 my-5">
              {loading ? (
                <Loader />
              ) : error ? (
                <h1 className="text-center py-4">Something went wrong</h1>
              ) : filteredRooms?.length === 0 ? (
                <h1 className="text-center">
                  No rooms found matching your criteria
                </h1>
              ) : (
                filteredRooms?.map((room) => (
                  <div
                    className="flex flex-col bg-white rounded text-black lg:w-2/5 w-4/5 mt-3"
                    key={room?._id}
                  >
                    <img
                      className="sm:h-40 h-28 rounded-t "
                      src={`${baseUrl}/images/${room?.images?.[0]?.filename}`}
                      alt="..."
                    />
                    <div className="sm:p-3 p-2 flex flex-col gap-1">
                      <h5 className="font-semibold sm:text-lg text-base">
                        {room?.hotelName}
                      </h5>
                      <p className="text-xs sm:text-sm">
                        <span className="font-semibold">City: </span>
                        {room?.city}
                      </p>
                      <p className="text-xs sm:text-sm">
                        <span className="font-semibold">Country: </span>
                        {room?.country}
                      </p>
                      <p className="text-xs sm:text-sm">
                        <span className="font-semibold">Rent Per Day: </span>
                        {room?.rentPerDay} Pkr
                      </p>
                      <p className="text-xs sm:text-sm">
                        <span className="font-semibold">Phone Number: </span>0
                        {room?.phoneNumber}
                      </p>
                      <p className="text-xs sm:text-sm">
                        <span className="font-semibold">
                          Accommodation for:{" "}
                        </span>
                        {room?.maxCount} person
                      </p>
                      <div className="flex flex-col gap-1 sm:gap-0 sm:flex-row sm:items-center justify-between text-xs">
                        <div className="flex gap-1">
                          <button
                            className="bg-blue-900 rounded p-2"
                            onClick={() => toggleShowModel(room)}
                          >
                            View Detail
                          </button>
                          {checkInDate && checkOutDate && (
                            <button
                              className="bg-blue-900 rounded p-2"
                              onClick={() => {
                                setBookRoom(true);
                                setRoomDetail(room);
                              }}
                            >
                              Book Room
                            </button>
                          )}
                          {user.role === "Tourist" ? (
                            <button className="bg-blue-900 rounded p-2">
                              <a
                                href={room?.location}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                view on map
                              </a>
                            </button>
                          ) : (
                            <NavLink to="/profile/view_route">
                              <button className="bg-blue-900 rounded p-2">
                                Update Details
                              </button>
                            </NavLink>
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
      )}
    </>
  );
};

export default Confirmhotel;
