import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { site_logo } from "../../images";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Navbar = ({ styles }) => {
  const { isLoggedIn } = useAuth();
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navbarStyle = {
    backgroundColor: scrolling ? "#171b2a" : "",
    transition: "background-color 0.3s ease",
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <nav
        className={`text-white fixed w-full z-50  ${
          menuOpen ? "opacity-90" : "bg-opacity-50 "
        } 
            bg-slate-900  border-b border-white border-opacity-50`}
        style={navbarStyle}
      >
        <div className="flex lg:hidden justify-between items-center w-full p-1">
          <div className="flex items-center">
            <img
              className="h-11 sm:h-12 sm:w-28 w-14 cursor-pointer"
              src={site_logo}
              alt="logo"
            />
            <span className="text-lg sm:text-2xl font-logofont">
              Smart Traveling System
            </span>
          </div>
          <div onClick={toggleMenu}>
            {menuOpen ? (
              <AiOutlineClose name="menu" className="cursor-pointer h-6" />
            ) : (
              <GiHamburgerMenu name="menu" className="cursor-pointer h-6" />
            )}
          </div>
        </div>
        <div
          className={`flex flex-col lg:flex-row w-full  z-10 py-3 items-center lg:gap-16 gap-2  absolute lg:static transition-all duration-500 ease-in-out ${
            menuOpen ? "opacity-100 bg-slate-950 py-4" : "top-[-490px] "
          } lg:opacity-100 opacity-100`}
        >
          <div
            className={`${styles.navlink} flex flex-col lg:flex-row list-none lg:gap-8 text-center gap-2 text-base items-center`}
          >
            <div className="lg:flex items-center hidden ">
              <img className="h-12 w-24 pl-3" src={site_logo} alt="" />
              <span className="font-logofont text-2xl">
                Smart Traveling System
              </span>
            </div>
            <button onClick={() => scrollToSection("home")}>Home</button>
            <button onClick={() => scrollToSection("about")}>About</button>
            <button onClick={() => scrollToSection("discover")}>
              Discover
            </button>
            <button onClick={() => scrollToSection("gallery")}>Gallery</button>
            <button onClick={() => scrollToSection("footer")}>
              Contact Us
            </button>
            <NavLink to="/profile">
              <button>Profile</button>{" "}
            </NavLink>
            <div className="lg:absolute right-5">
              {" "}
              {isLoggedIn ? (
                <NavLink
                  to="/logout"
                  className="bg-white text-black border-none sm:font-semibold text-sm px-6 py-2 md:px-7 rounded-md border-transparent cursor-pointer transition duration-300 ease-in-out hover:text-white hover:border-white hover:bg-opacity-50 hover:bg-black"
                >
                  Log Out
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className="bg-white text-black border-none sm:font-semibold text-sm px-6 py-2 md:px-7 rounded-md border-transparent cursor-pointer transition duration-300 ease-in-out hover:text-white hover:border-white hover:bg-opacity-50 hover:bg-black"
                >
                  Log In
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
