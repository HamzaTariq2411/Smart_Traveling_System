import { TbBrandBooking } from "react-icons/tb";
import { MdFavoriteBorder } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { RiProductHuntLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";
import { IoBedOutline } from "react-icons/io5";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdFindReplace } from "react-icons/md";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";

const routes = [
  {
    role:"Hotel Admin",
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    role:"Tourist",
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    role:"Flight Admin",
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    role:"Super Admin",
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    role:"Tourist",
    path: "/profile/update_profile",
    name: "Update Profile",
    icon: <RiProductHuntLine />,
  },
  {
    role:"Hotel Admin",
    path: "/profile/update_profile",
    name: "Update Profile",
    icon: <RiProductHuntLine />,
  },
  {
    role:"Flight Admin",
    path: "/profile/update_profile",
    name: "Update Profile",
    icon: <RiProductHuntLine />,
  },
  {
    role:"Super Admin",
    path: "/profile/update_profile",
    name: "Update Profile",
    icon: <RiProductHuntLine />,
  },
  {
    role:"Hotel Admin",
    path: "/profile/add_rooms",
    name: "Add rooms",
    icon: <HiOutlineDocumentAdd />,
  },
  {
    role:"Hotel Admin",
    path: "/profile/myRooms",
    name: "My Rooms",
    icon: <IoBedOutline/>,
  },
  {
    role:"Hotel Admin",
    path: "/profile/all_bookings",
    name: "Bookings",
    icon: <TbBrandBooking />,
  },
  {
    role:"Flight Admin",
    path: "/profile/add_tickets",
    name: "Add Tickets",
    icon: <HiOutlineDocumentAdd />,
  },
  {
    role:"Flight Admin",
    path: "/profile/my_posted_tickets",
    name: "My Posted Tickets",
    icon: <IoIosAirplane />,
  },
  {
    role:"Flight Admin",
    path: "/profile/all_booked_tickets",
    name: "All Booked Tickets",
    icon: <TbBrandBooking />,
  },

  {
    role:"Super Admin",
    path: "/profile/allUsers",
    name: "All Users",
    icon: <FaRegUser />,
  },
  {
    role:"Super Admin",
    path: "/profile/allTickets",
    name: "All Tickets",
    icon: <IoIosAirplane />,
  },
  {
    role:"Super Admin",
    path: "/profile/allRooms",
    name: "All Rooms",
    icon: <IoBedOutline />,
  },
  {
    role:"Super Admin",
    name: "My Bookings",
    icon: <TbBrandBooking />,
    subRoutes: [
      {
        path: "/profile/allTicketsBookings",
        name: "All Tickets Bookings",
        icon: <IoIosAirplane/>,
      },
      {
        path: "/profile/allRoomsBookings",
        name: "All Rooms Bookings",
        icon: <IoBedOutline />,
      },
    ],
  },
  {
    role:"Tourist",
    name: "Reservation",
    icon: <TbBrandBooking />,
    subRoutes: [
      {
        path: "/profile/reservation_craft_info",
        name: "Craft Info",
        icon: <IoIosAirplane />,
      },
      {
        path: "/profile/reservation_hotel_info",
        name: "Hotel Info",
        icon: <IoBedOutline />,
      },
    ],
  },
  {
    role:"Tourist",
    name: "My Bookings",
    icon: <TbBrandBooking />,
    subRoutes: [
      {
        path: "/profile/bookedTickets",
        name: "Booked Tickets",
        icon: <IoIosAirplane />,
      },
      {
        path: "/profile/bookedRooms",
        name: "Booked Rooms",
        icon: <IoBedOutline />,
      },
    ],
  },
  {
    role:"Tourist",
    name: "Search Locals",
    icon: <IoSearch />,
    subRoutes: [
      {
        path: "/profile/cuisine_compass",
        name: "Cuisine Compass",
        icon: <IoFastFoodOutline />,
      },
      {
        path: "/profile/signature_sights",
        name: "Signature Sights",
        icon: <MdFindReplace />,
      },
    ],
  },
  {
    role:"Tourist",
    path: "/profile/view_route",
    name: "View Route",
    icon: <LuMapPin />,
  },
];
export default routes;
