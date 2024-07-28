import React, { useState } from "react";
import { Outlet, useOutlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import WelcomePage from "../components/Profile/WelcomePage";
import GoToTop from "../components/Profile/GoToTop";

const Profile = () => {
  const outlet = useOutlet();
  const [isopen, setIsopen] = useState(false);
  const toggle = () => setIsopen(!isopen);
  const toggleSidebar = () => {
    setIsopen(false);
  };

  return (
    <div className="relative min-h-screen bg-cover bg-fixed bg-Profile">
      <GoToTop />
      <div className="flex w-full min-h-screen bg-gray-900 bg-opacity-40">
        <div className="fixed z-50">
          <Sidebar setIsopen={setIsopen} isopen={isopen} toggle={toggle} />
        </div>
        <div className="flex-grow text-white" onClick={toggleSidebar}>
          <div
            className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 ${
              isopen ? "z-40" : "hidden"
            }`}
          />
          {outlet ? <Outlet /> : <WelcomePage />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
