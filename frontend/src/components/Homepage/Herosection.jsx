import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Herosection = ({ styles }) => {
  useEffect(() => {
    AOS.init({ duration: "3000", delay: "1000" });
  }, []);
  return (
    <div
      className={`${styles.section__container} ${styles.header__container} overflow-hidden`}
    >
      <h1 className="md:text-4xl text-2xl" data-aos="fade-right">
        The new way to plan your next adventure
      </h1>
      <h4 className="md:text-2xl text-md" data-aos="fade-left">
        Explore the colourful world
      </h4>
      
      <div className="my-2">
        <Link to="/signup" >
          <button
            className="bg-white text-black border-none sm:font-semibold text-sm px-6 py-2 md:px-7 rounded-md border-transparent cursor-pointer transition duration-300 ease-in-out hover:text-white hover:border-white hover:bg-opacity-50 hover:bg-black"
            data-aos="fade-left"
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Herosection;
