import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SidebarMenu = ({ showAnimation, route, isopen, setIsopen }) => {
  const menuAnimation = {
    hidden: {
      opacity: 0,
      height: 0,
      padding: 0,
      transition: { duration: 0.3, when: "afterChildren" },
    },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
      },
    },
  };

  const menuItemAnimation = {
    hidden: (i) => ({
      padding: 0,
      x: "-100%",
      transition: {
        duration: (i + 1) * 0.1,
      },
    }),
    show: (i)=> ({
      x: 0,
      transition: {
        duration: (i + 1) * 0.1,
      },
    }),
  };

  const [isMenuopen, SetisMenuOpen] = useState(false);
  const toggleMenu = () => {
    SetisMenuOpen(!isMenuopen)
    setIsopen(true);
  };
  useEffect( () =>{
    if(!isopen){
      SetisMenuOpen(false);
    }
  }, [isopen]);
  return (
    <div className="sidebarmenu">
      <div
        className="flex gap-3 items-center border-r-4 border-transparent transition-all duration-200 ease-in-out hover:border-white hover:bg-[#2D3359] hover:text-white justify-between cursor-pointer"
        onClick={toggleMenu}
      >
        <div className="flex gap-2">
          <div className="md:text-3xl text-2xl pl-1.5">{route?.icon}</div>
          <AnimatePresence>
            {isopen && (
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="md:text-lg text-base whitespace-nowrap "
              >
                {route?.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isopen && (
        <motion.div animate={isMenuopen ? { rotate:-90 } : { rotate: 0 } }>
          <FaAngleDown className="md:text-xl text-md"/>
        </motion.div>
        )}
      </div>
      <AnimatePresence>
        {isMenuopen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col gap-2"
          >
            {route?.subRoutes?.map((subRoute, i) => (
              <motion.div variants={menuItemAnimation} custom={i} key={i}>
                <NavLink
                  className="flex gap-3 items-center hover:border-r-4 border-transparent transition-all duration-200 ease-in-out hover:border-white hover:bg-[#2D3359] hover:text-white  pl-4"
                  to={subRoute?.path}
                >
                  <div className="md:text-3xl text-2xl pl-1.5">{subRoute?.icon}</div>
                  <AnimatePresence>
                    {isopen && (
                      <motion.div
                        variants={showAnimation}
                        className="md:text-lg text-base whitespace-nowrap"
                      >
                        {subRoute?.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarMenu;
