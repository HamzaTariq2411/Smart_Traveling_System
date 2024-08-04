import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import routes from "./Data";
import { useAuth } from "../../store/auth";
import SidebarMenu from "./SidebarMenu";
import { FaRegCircleUser } from "react-icons/fa6";

const Sidebar = ({ isopen, setIsopen, toggle }) => {
  const { user } = useAuth();
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <>
      <div className="flex whitespace-nowrap ">
        <motion.div
          animate={{
            width: isopen ? "250px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 11,
            },
          }}
          className="text-white min-h-svh bg-[#100E1C] overflow-y-auto overflow-x-hidden"
        >
          <div className="flex items-center content-center justify-between whitespace-nowrap py-3.5 px-2.5 relative ">
            <AnimatePresence>
              {isopen && (
                <motion.h1
                  className="md:text-2xl text-md leading-[0px]"
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  Profile
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="md:text-2xl text-md cursor-pointer">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="flex flex-col gap-2">
            {routes.map((route, index) => {
              if (route?.role === user?.role) {
                if (route?.subRoutes) {
                  return (
                    <SidebarMenu
                      showAnimation={showAnimation}
                      setIsopen={setIsopen}
                      isopen={isopen}
                      route={route}
                      key={route?.name}
                    />
                  );
                }
                return (
                  <NavLink
                    className="flex gap-3 items-center border-r-4 border-transparent transition-all duration-200 ease-in-out hover:border-white hover:bg-[#2D3359] hover:text-white"
                    to={route?.path}
                    key={index}
                  >
                    <div className="md:text-3xl text-2xl pl-1.5">
                      {route?.icon}
                    </div>
                    <AnimatePresence>
                      {isopen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="md:text-lg text-base whitespace-nowrap"
                        >
                          {route?.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                );
              }
            })}
          </section>
          <div className="flex items-center content-center whitespace-nowrap py-3.5 px-2.5 absolute bottom-0 gap-4">
            <div className="md:text-2xl text-base cursor-pointer pt-2">
              <FaRegCircleUser onClick={toggle} />
            </div>
            <AnimatePresence>
              {isopen && (
                <motion.div
                  className="md:text-2xl text-md"
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                >
                  <NavLink
                    to="/logout"
                    className="bg-white text-black border-none font-semibold text-xs px-3 py-2 md:px-5 md:py-2 rounded-md border-transparent cursor-pointer transition duration-300 ease-in-out hover:text-white hover:bg-opacity-50 hover:bg-black"
                  >
                    Log Out
                  </NavLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Sidebar;
