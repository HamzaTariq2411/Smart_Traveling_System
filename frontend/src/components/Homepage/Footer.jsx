import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Footer = ({ styles }) => {
  return (
    <section className={`${styles.footer} overflow-hidden `} id="footer">
      <div
        className={`${styles.section__container} ${styles.footer__container}`}
      >
        <h4
          className=" text-lg sm:text-xl md:text-2xl"
          data-aos="zoom-out"
          data-aos-delay="100"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
        >
          Smart Tarveling System.
        </h4>
        <div
          className={styles.footer__socials}
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
        >
          <span>
            <NavLink>
              <FaFacebookF />
            </NavLink>
          </span>
          <span>
            <NavLink>
              <AiFillInstagram />
            </NavLink>
          </span>
          <span>
            <NavLink>
              <FaTwitter />
            </NavLink>
          </span>
          <span>
            <NavLink>
              <FaLinkedin />
            </NavLink>
          </span>
        </div>
        <p
          data-aos="zoom-in"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
        >
          Cheap Romantic Vacations. Many people feel that there is a limited
          amount of abundance, wealth, or chance to succeed in life.
        </p>
      </div>
      <div
        className={styles.footer__bar}
      >
        Copyright © 2023 by Hamza Tariq.
      </div>
    </section>
  );
};

export default Footer;
