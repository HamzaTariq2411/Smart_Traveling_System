import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import RoomDetailModel from "../TouristDashboard/RoomDetailModel";
import UpdateRoomModel from "./UpdateRoomModel";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { toast } from "react-toastify";
import Loader from "../../../loaders/Loader";
import { baseUrl } from "../../helper";

const MyRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { user, token } = useAuth();
  const [showModel, setShowModel] = useState(false);
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/getMyRooms`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
        setLoading(false);
      } else {
        console.error("Failed to fetch data:", response.statusText);
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

  const toggleShowModel = (room) => {
    setSelectedRoom(room);
    setShowModel(true);
  };

  const handleUpdateClick = (room) => {
    setSelectedRoom(room);
    setShowUpdateModel(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRooms = rooms.filter((room) =>
    room.hotelName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteRoom = (room) => {
    setRoomToDelete(room);
    setShowDeleteModal(true);
  };

  const confirmDeleteRoom = async () => {
    if (!roomToDelete) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/api/deleteRoom/${roomToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        toast.dismiss();
        toast.success("Room Deleted Successfully");
        setLoading(false);
        fetchData();
        setShowDeleteModal(false);
        setRoomToDelete(null);
      } else {
        setLoading(false);
        toast.dismiss();
        toast.error("Something went wrong");
        console.error("Failed to delete room:", response.statusText);
      }
    } catch (error) {
      setLoading(false);
      toast.dismiss();
      toast.error("Something went wrong");
      console.error("Error deleting room:", error);
    }
  };

  return (
    <>
      {showUpdateModel && (
        <UpdateRoomModel
          room={selectedRoom}
          setShowUpdateModel={setShowUpdateModel}
          fetchData={fetchData}
        />
      )}
      {showModel && (
        <div className="z-20 top-0 left-0 right-0 fixed">
          <div
            className="bg-black bg-opacity-80 h-full w-full fixed"
            onClick={() => {
              setShowModel(false);
            }}
          ></div>
          <RoomDetailModel setShowModel={setShowModel} room={selectedRoom} />
        </div>
      )}
      <ConfirmDeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteRoom}
      />
      <div className="h-full ml-14">
        <div className="text-center text-2xl py-5">My Posted Rooms</div>
        <div className="flex flex-col sm:flex-row justify-around gap-5 py-3 px-16">
          <div className="sm:w-11/12 w-auto">
            <input
              className="w-full h-10 bg-transparent border-solid border-2 border-zinc-800 rounded p-2 bg-opacity-90 backdrop-filter backdrop-blur-3xl text-xs sm:text-sm md:text-base"
              type="text"
              placeholder="Search By Name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-around md:mx-16 mr-4 gap-1 my-5">
          {loading ? (
            <Loader />
          ) : error ? (
            <h1>Something went wrong</h1>
          ) : (
            filteredRooms?.map((room) => (
              <div
                className="flex flex-col bg-white rounded text-black lg:w-2/5 w-auto mt-3"
                key={room?.id}
              >
                <img
                  className="sm:h-40 h-28 rounded-t"
                  src={`${baseUrl}/images/${room?.images?.[0]?.filename}`}
                  alt="..."
                />
                <div className="sm:p-3 p-2 flex flex-col gap-1">
                  <h5 className="font-semibold sm:text-lg text-base">
                    {room?.hotelName}
                  </h5>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Country: </span>
                    {room?.country}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">City: </span>
                    {room?.city}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Accommodation For: </span>
                    {room?.maxCount} person
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
                    <span className="font-semibold">Room Type: </span>
                    {room?.roomType}
                  </p>
                  <div className="flex flex-col gap-1 sm:gap-0 sm:flex-row sm:items-center justify-between text-xs">
                    <div className="flex gap-1">
                      <button
                        className="bg-blue-900 rounded p-2"
                        onClick={() => toggleShowModel(room)}
                      >
                        View Detail
                      </button>
                      {user.role === "Tourist" ? (
                        <NavLink to="/profile/view_route">
                          <button className="bg-blue-900 rounded p-2">
                            Find Route
                          </button>
                        </NavLink>
                      ) : (
                        <>
                          <button
                            className="bg-blue-900 rounded p-2"
                            onClick={() => handleUpdateClick(room)}
                          >
                            {loading ? "Loading..." : "Update Details"}
                          </button>
                          <button
                            className="bg-red-700 rounded p-2"
                            onClick={() => handleDeleteRoom(room)}
                          >
                            {loading ? "Loading..." : "Delete Room"}
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

export default MyRooms;
