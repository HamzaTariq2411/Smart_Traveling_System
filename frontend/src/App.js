import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Confirmcraft from "./components/Profile/TouristDashboard/Confirmcraft";
import Confirmhotel from "./components/Profile/TouristDashboard/Confirmhotel";
import Viewroute from "./components/Profile/TouristDashboard/Viewroute";
import UpdateProfile from "./components/Profile/UpdateProfile";
import SignatureSights from "./components/Profile/TouristDashboard/SignatureSights";
import CuisineCompass from "./components/Profile/TouristDashboard/CuisineCompass";
import Logout from "./pages/Logout";
import { useAuth } from "./store/auth";
import AddRooms from "./components/Profile/hotelAdminDashboard/AddRooms";
import MyRooms from "./components/Profile/hotelAdminDashboard/MyRooms";
import MyBookedRooms from "./components/Profile/hotelAdminDashboard/MybookedRooms";
import AddTickets from "./components/Profile/AirlineAdminDashboard/AddTickets";
import MyPostedTickets from "./components/Profile/AirlineAdminDashboard/MyPostedTickets";
import BookedRooms from "./components/Profile/TouristDashboard/BookedRooms";
import BookedTickets from "./components/Profile/TouristDashboard/BookedTickets";
import AllBookedTickets from "./components/Profile/AirlineAdminDashboard/AllBookedTickets";
import { Provider } from "react-redux";
import store from "./store/store";
import PreLoader from "./loaders/PreLoader";
import { useEffect, useState } from "react";

function App() {
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route path="/logout" element={<Logout />} />
              <Route
                path="/profile"
                element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
              >
                <Route
                  path="/profile/update_profile"
                  element={<UpdateProfile />}
                />
                <Route
                  path="/profile/reservation_craft_info"
                  element={<Confirmcraft />}
                />
                <Route
                  path="/profile/reservation_hotel_info"
                  element={<Confirmhotel />}
                />
                <Route path="/profile/bookedRooms" element={<BookedRooms />} />
                <Route
                  path="/profile/bookedTickets"
                  element={<BookedTickets />}
                />
                <Route
                  path="/profile/signature_sights"
                  element={<SignatureSights />}
                />
                <Route
                  path="/profile/cuisine_compass"
                  element={<CuisineCompass />}
                />
                <Route path="/profile/view_route" element={<Viewroute />} />
                <Route path="/profile/add_rooms" element={<AddRooms />} />
                <Route path="/profile/myRooms" element={<MyRooms />} />
                <Route
                  path="/profile/all_bookings"
                  element={<MyBookedRooms />}
                />
                <Route path="/profile/add_tickets" element={<AddTickets />} />
                <Route
                  path="/profile/my_posted_tickets"
                  element={<MyPostedTickets />}
                />
                <Route
                  path="/profile/all_booked_tickets"
                  element={<AllBookedTickets />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      )}
    </>
  );
}

export default App;
