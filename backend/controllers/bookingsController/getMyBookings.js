import bookingsModel from "../../models/bookings-Model.js";

const getMyBookings = async (req, res) => {

  const myBookings = await bookingsModel.find({ userId: req.user._id });
  return res.send(myBookings);
};

export default getMyBookings;
