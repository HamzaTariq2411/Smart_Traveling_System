import React from "react";
import { discover_1, discover_2, discover_3 } from "../../images";

const Discover = ({ styles }) => {
  return (
    <section className={`${styles.discover} overflow-hidden`} id="discover">
      <div
        className={`${styles.section__container} ${styles.discover__container}`}
      >
        <h2
          className={`${styles.section__header}  sm:text-4xl text-xl`}
          data-aos="fade-down"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
        >
          Discover the most engaging places
        </h2>
        <p
          className={`${styles.section__subheader} text-xs sm:text-sm md:text-base`}
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
        >
          Let's see the world with us with you and your family.
        </p>
        <div className={styles.discover__grid}>
          <div
            className={styles.discover__card}
            data-aos="fade-down"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
          >
            <div className={styles.discover__image}>
              <img src={discover_1} alt="discover" />
            </div>
            <div className={styles.discover__card__content}>
              <h4>Norway</h4>
              <p>
                Discover the untamed beauty of Norway, a land where rugged
                mountains, and enchanting northern lights paint a surreal
                backdrop.
              </p>
            </div>
          </div>
          <div
            className={styles.discover__card}
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
          >
            <div className={styles.discover__image}>
              <img src={discover_2} alt="discover" />
            </div>
            <div className={styles.discover__card__content}>
              <h4>London</h4>
              <p>
                From urban rock climbing to twilight cycling through royal
                parks, London beckons adventure enthusiasts to embrace
                opportunities.
              </p>
            </div>
          </div>
          <div
            className={styles.discover__card}
            data-aos="fade-down"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
          >
            <div className={styles.discover__image}>
              <img src={discover_3} alt="discover" />
            </div>
            <div className={styles.discover__card__content}>
              <h4>Japan</h4>
              <p>
                From scaling the iconic peaks of Mount Fuji to immersing in the
                serenity, Japan offers adventurers a captivating cultural
                treasures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discover;
