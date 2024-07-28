import React from "react";
import { aboutimg } from "../../images";
import "aos/dist/aos.css";

const Aboutus = ({ styles }) => {
  return (
    <section className={`${styles.about} overflow-hidden`} id="about">
      <div
        className={`${styles.section__container} ${styles.about__container}`}
      >
        <div className={styles.about__content}>
          <h2
            className={`${styles.section__header} md:text-6xl sm:text-4xl text-2xl`}
            data-aos="fade-right"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
          >
            About us
          </h2>
          <p
            className={`${styles.section__subheader} text-xs sm:text-sm md:text-base `}
            data-aos="fade-left"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
          >
            Our mission is to ignite the spirit of discovery in every traveler's
            heart, offering meticulously crafted itineraries that blend
            adrenaline-pumping activities with awe-inspiring landscapes. With a
            team of seasoned globetrotters, we ensure that every expedition is
            infused with excitement, grace our planet. Embark on a voyage of a
            lifetime with us, as we redefine the art of exploration.
          </p>
          <div className={styles.about__flex}
          data-aos="fade-right"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out">
            <div className={styles.about__card} >
              <h4>99+</h4>
              <p>Flights Book</p>
            </div>
            <div className={styles.about__card} >
              <h4>99+</h4>
              <p>Hotel Book</p>
            </div>
            <div className={styles.about__card} >
              <h4>99+</h4>
              <p>Destinations</p>
            </div>
          </div>
        </div>
        <div className={styles.about__image} >
          <img src={aboutimg} alt="about"
           data-aos="fade-down"
           data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"/>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
