import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const GoToTop = () => {
  const [visible, setVisible] = useState(false);
  const gotoTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const listenToScroll = () => {
    let heightTohidden = 100;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightTohidden) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return()=> window.removeEventListener("scroll", listenToScroll)
  }, []);
  return (
    <>
        <div
          className={`fixed right-4 bottom-4 bg-stone-500 rounded-full p-2 cursor-pointer transition ease-in-out duration-500 ${visible ? 'opacity-1' : 'opacity-0'}`}
          onClick={gotoTop}
        >
          <FaArrowUp />
        </div>
    </>
  );
};

export default GoToTop;
