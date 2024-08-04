import React, { useState, useEffect } from "react";
import Data from "./ResturentsData.json";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setMapCoordinates } from "../../../store/mapSlice";
import { NavLink } from "react-router-dom";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="pl-12 px-2 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-black">
          Location Permission
        </h2>
        <p className="mb-4 text-black">
          Do you allow us to access your location to show the nearest
          restaurants?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

const CuisineCompass = () => {
  const [visibleItems, setVisibleItems] = useState(10); // Number of items initially visible
  const [loading, setLoading] = useState(false); // Flag to indicate if new items are being loaded
  const [allDataLoaded, setAllDataLoaded] = useState(false); // Flag to indicate if all data has been loaded
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredData, setFilteredData] = useState([]); // State to hold filtered data
  const [location, setLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewingNearest, setIsViewingNearest] = useState(false); // State to track if user is viewing nearest restaurants

  const dispatch = useDispatch();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          toast.dismiss();
          toast.success("Now you are seeing the nearest restaurants");
        },
        (error) => {
          setLocation(`Error: ${error.message}`);
          toast.dismiss();
          toast.error(`Error: ${error.message}`);
        }
      );
    } else {
      setLocation("Geolocation is not supported in this browser.");
      toast.dismiss();
      toast.error("Geolocation is not supported in this browser.");
    }
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setIsViewingNearest(false); // Reset to viewing all when search query changes
  };

  // Function to calculate distance using the Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  // Function to sort data based on user's location
  useEffect(() => {
    if (location && isViewingNearest) {
      setFilteredData((prevData) => {
        const sortedData = [...prevData].sort((a, b) => {
          const distanceA = calculateDistance(
            location.latitude,
            location.longitude,
            a.location.latitude,
            a.location.longitude
          );
          const distanceB = calculateDistance(
            location.latitude,
            location.longitude,
            b.location.latitude,
            b.location.longitude
          );
          return distanceA - distanceB;
        });
        return sortedData;
      });
    }
  }, [location, isViewingNearest]);

  // Function to filter data based on search query
  useEffect(() => {
    const filtered = Data.filter(
      (place) =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    setVisibleItems(10); // Reset visible items when search changes
    setAllDataLoaded(false); // Reset allDataLoaded flag when search changes
  }, [searchQuery]);

  // Function to handle scroll and load more data
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading ||
      allDataLoaded
    ) {
      return;
    }
    setLoading(true);
  };

  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!loading) return;

    // Simulate loading delay (replace with actual data fetching)
    setTimeout(() => {
      setVisibleItems((prevVisibleItems) => {
        const newVisibleItems = prevVisibleItems + 10;
        if (newVisibleItems >= filteredData.length) {
          setAllDataLoaded(true); // If all filtered data is loaded
          return filteredData.length;
        } else {
          return newVisibleItems;
        }
      });
      setLoading(false);
    }, 1000); // Simulated delay of 1 second
  }, [loading, filteredData]);

  const handleShowNearestRestaurants = () => {
    if (isViewingNearest) {
      setIsViewingNearest(false);
      setLocation(null); // Reset location to show all data
      setFilteredData(Data); // Reset filtered data to show all data
      toast.dismiss();
      toast.success("Now you are seeing all restaurants");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    getLocation();
    setIsViewingNearest(true);
  };

  const handleViewRoute = (latitude, longitude) => {
    dispatch(setMapCoordinates({ lat: latitude, lng: longitude }));
  };

  return (
    <div className="ml-10 px-4 py-8">
      <h1 className="sm:text-3xl text-2xl font-bold mb-8 text-center ">
        Famous Resturents
      </h1>
      <div className="mb-4 flex gap-3 md:flex-row flex-col">
        <input
          type="text"
          placeholder="Search by name, city, or country"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-1 md:w-4/5 w-auto py-2 mb-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-black h-10"
        />
        <button
          onClick={handleShowNearestRestaurants}
          className=" px-4 h-10 md:w-1/5 w-auto text-xs bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isViewingNearest ? "Show all" : "Show nearest restaurants"}
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
      {filteredData.length === 0 && (
        <div className="text-center mt-4">
          <p>No restaurant found.</p>
        </div>
      )}
      <ul className="flex flex-wrap justify-center gap-6">
        {filteredData?.slice(0, visibleItems)?.map((place) => (
          <li
            key={place?.name}
            className="bg-white md:w-2/5 w-11/12 my-2 lg:p-4 p-2 rounded-lg shadow-md"
          >
            <div className="flex justify-center mb-4">
              {place?.image_url && (
                <img
                  src={place?.image_url}
                  alt={place?.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">
              {place?.name}
            </h3>
            <p className="text-gray-600 mb-2">{place?.description}</p>
            <p className="text-gray-800 font-semibold mb-2">
              {place?.city}, {place?.country}
            </p>
            <NavLink to="/profile/view_route">
              <button
                onClick={() =>
                  handleViewRoute(
                    place?.location?.latitude,
                    place?.location?.longitude
                  )
                }
                className="bg-blue-900 rounded p-2 text-white"
              >
                View Route
              </button>
            </NavLink>
          </li>
        ))}
      </ul>
      {loading && (
        <div className="text-center mt-4">
          <p>Loading more...</p>
        </div>
      )}
      {!loading && allDataLoaded && (
        <div className="text-center mt-4">
          <p>No more data</p>
        </div>
      )}
    </div>
  );
};

export default CuisineCompass;
