import React from 'react';
import Navbar from "../components/Homepage/Navbar";
import Herosection from "../components/Homepage/Herosection";
import Aboutus from "../components/Homepage/Aboutus";
import Discover from "../components/Homepage/Discover";
import Gallery from "../components/Homepage/Gallery";
import Herotext from "../components/Homepage/Herotext";
import Footer from "../components/Homepage/Footer";
import styles from "../components/Homepage/styles.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <header id="home">
        <Navbar styles={styles}/>
        <Herosection styles={styles} />
      </header>
      <Aboutus styles={styles}/>
      <Discover styles={styles}/>
      <Herotext styles={styles}/>
      <Gallery styles={styles}/>
      <Footer styles={styles}/>
    </div>
  );
};

export default Home;
