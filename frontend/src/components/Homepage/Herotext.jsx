import React from 'react'

const Herotext = ({styles}) => {
  return (
    <section className={styles.hero}>
        <div
          className={`${styles.section__container} ${styles.hero__container} text-4xl sm:text-6xl md:text-7xl lg:text-8xl overflow-hidden`}
          data-aos="zoom-in"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
        >
          <p>Smart Traveling System.</p>
        </div>
      </section>
  )
}

export default Herotext
