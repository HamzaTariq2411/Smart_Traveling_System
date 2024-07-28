import roomModel from "../../models/room-Model.js";

const getMyRooms = async (req, res) => {
  const { role } = req.user;
  if (role === "Fligth Admin" || role === "Torist") {
    return res.status(400).json({
      msg: "Flight Admin and Torist is not allowed to access this resource",
    });
  }

  const myRooms = await roomModel.find({ postedBy: req.user._id });
  return res.send(myRooms);
};

export default getMyRooms;
