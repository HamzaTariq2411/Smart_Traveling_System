import bookingsModel from "../../models/bookings-Model.js";

const getBookedRooms= async (req, res) => {

  const bookedRooms = await bookingsModel.find({ postedBy: req.user._id });
  return res.send(bookedRooms);
};

export default getBookedRooms;
