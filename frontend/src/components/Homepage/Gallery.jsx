import React from "react";
import {
  gallery_1,
  gallery_2,
  gallery_3,
  gallery_4,
  gallery_5,
} from "../../images";

const Gallery = ({ styles }) => {
  return (
    <section className={`${styles.gallery} pt-16 overflow-hidden`} id="gallery">
      <div className={styles.gallery__container}>
        <h2
          className={`${styles.section__header}  sm:text-4xl text-2xl`}
          data-aos="fade-down"
          data-aos-delay="50"
          data-aos-duration="600"
          data-aos-easing="ease-in-out"
        >
          Gallery photos
        </h2>
        <p
          className={`${styles.section__subheader} text-xs sm:text-sm md:text-base`}
          data-aos="fade-right"
          data-aos-delay="50"
          data-aos-duration="600"
          data-aos-easing="ease-in-out"
        >
          Explore the most beautiful places in the world.
        </p>
        <div className="flex flex-wrap gap-2 justify-center align-middle py-5">
          <div
            className={`${styles.gallery__card} w-64`}
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
          >
            <img className="h-80" src={gallery_5} alt="gallery" />
            <div className={styles.gallery__content}>
              <h4>Badshahi Mosque</h4>
              <p>Pakistan</p>
            </div>
          </div>
          <div
            className={`${styles.gallery__card} w-64`}
            data-aos="fade-down"
            data-aos-delay="50"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
          >
            <img className="h-80" src={gallery_1} alt="gallery" />
            <div className={styles.gallery__content}>
              <h4>Northern Lights</h4>
              <p>Norway</p>
            </div>
          </div>
          <div
            className={`${styles.gallery__card} w-64`}
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
          >
            <img className="h-80" src={gallery_2} alt="gallery" />
            <div className={styles.gallery__content}>
              <h4>Krabi</h4>
              <p>Thailand</p>
            </div>
          </div>
          <div
            className={`${styles.gallery__card} w-64`}
            data-aos="fade-down"
            data-aos-delay="50"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
          >
            <img className="h-80" src={gallery_3} alt="gallery" />
            <div className={styles.gallery__content}>
              <h4>Bali</h4>
              <p>Indonesia</p>
            </div>
          </div>
          <div
            className={`${styles.gallery__card} w-64`}
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
          >
            <img className="h-80" src={gallery_4} alt="gallery" />
            <div className={styles.gallery__content}>
              <h4>Tokyo</h4>
              <p>Japan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
