/* global google */

import React, { useRef, useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import Loader from "../../../loaders/Loader";

const center = { lat: 31.5497, lng: 74.3436 }; // Lahore, Pakistan

const libraries = ["places"]; // Define libraries as a constant outside of the component

function Viewroute() {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: libraries, // Use the constant here
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [tracking, setTracking] = useState(false);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [path, setPath] = useState([]);
  const [userMarker, setUserMarker] = useState(null);

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const originRef = useRef();
  const destinationRef = useRef();
  const watchIdRef = useRef(null);

  const coordinates = useSelector((state) => state.map.coordinates);

  useEffect(() => {
    if (isLoaded && coordinates.lat && coordinates.lng) {
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat: coordinates.lat, lng: coordinates.lng };
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            destinationRef.current.value = results[0].formatted_address;
            setDestination(results[0].formatted_address);
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      });

      if (map) {
        const marker = new google.maps.Marker({
          position: latlng,
          map: map,
          title: "Destination",
        });
        setDestinationMarker(marker);
        map.panTo(latlng);
      }
    }
  }, [coordinates, map, isLoaded]);

  if (!isLoaded) {
    return <Loader />;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
    setOrigin("");
    setDestination("");

    if (destinationMarker) {
      destinationMarker.setMap(null);
      setDestinationMarker(null);
    }

    if (userMarker) {
      userMarker.setMap(null);
      setUserMarker(null);
    }

    if (userLocation) {
      setUserLocation(null);
    }

    setPath([]);
  }

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new google.maps.Geocoder();
          const latlng = { lat: latitude, lng: longitude };
          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                originRef.current.value = results[0].formatted_address;
                setOrigin(results[0].formatted_address);
              } else {
                window.alert("No results found");
              }
            } else {
              window.alert("Geocoder failed due to: " + status);
            }
          });
        },
        () => {
          window.alert("Geolocation failed");
        }
      );
    } else {
      window.alert("Your browser does not support geolocation");
    }
  }

  function startTracking() {
    if (navigator.geolocation) {
      setTracking(true);
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = { lat: latitude, lng: longitude };
          console.log(newPosition);
          setUserLocation(newPosition);
          setPath((prevPath) => [...prevPath, newPosition]);
          if (map) {
            map.panTo(newPosition);
          }
        },
        (error) => {
          console.error("Error getting position", error);
          setTracking(false);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    } else {
      window.alert("Your browser does not support geolocation");
    }
  }

  function stopTracking() {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      setTracking(false);
    }
  }

  return (
    <div className="h-svh w-screen relative text-black">
      <div className="h-full w-full">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          {path.length > 0 && (
            <Polyline
              path={path}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
              }}
            />
          )}
          {userLocation && (
            <Marker position={userLocation} title="Your location" />
          )}
        </GoogleMap>
      </div>
      <div className="ml-6 absolute top-2 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-md z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-2 space-y-2 md:space-y-0 md:space-x-2">
          <Autocomplete>
            <input
              type="text"
              placeholder="Your Location"
              ref={originRef}
              className="flex-grow p-2 border rounded"
              onChange={(e) => setOrigin(e.target.value)}
            />
          </Autocomplete>
          <Autocomplete>
            <input
              type="text"
              placeholder="Destination"
              ref={destinationRef}
              className="flex-grow p-2 border rounded"
              onChange={(e) => setDestination(e.target.value)}
            />
          </Autocomplete>

          <button
            onClick={clearRoute}
            className="p-2 bg-red-500 text-white rounded"
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-2 space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={() => {
              originRef.current.value = "";
              getCurrentLocation();
            }}
            className="p-2 sm:p-3 lg:p-4 bg-blue-500 text-white text-sm sm:text-base lg:text-lg rounded w-full sm:w-auto"
          >
            Use My Location
          </button>
          <button
            onClick={calculateRoute}
            className="p-2 sm:p-3 lg:p-4 bg-green-500 text-white text-sm sm:text-base lg:text-lg rounded w-full sm:w-auto"
          >
            Calculate Route
          </button>
          <button
            onClick={startTracking}
            disabled={tracking || origin === "" || destination === ""}
            className="p-2 sm:p-3 lg:p-4 bg-green-500 text-white text-sm sm:text-base lg:text-lg rounded w-full sm:w-auto disabled:bg-gray-400"
          >
            Start Travel
          </button>
          <button
            onClick={stopTracking}
            disabled={!tracking}
            className="p-2 sm:p-3 lg:p-4 bg-red-500 text-white text-sm sm:text-base lg:text-lg rounded w-full sm:w-auto disabled:bg-gray-400"
          >
            Stop Travel
          </button>
        </div>

        <div className="flex items-center justify-around ">
          <span>Distance: {distance}</span>
          <span>Duration: {duration}</span>
        </div>
      </div>
    </div>
  );
}

export default Viewroute;
