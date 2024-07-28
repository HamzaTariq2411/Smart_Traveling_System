import roomModel from "../../models/room-Model.js";

const roomController = async (req, res) => {
  try {
    const { role } = req.user;
    if (role === "Flight Admin" || role === "Tourist") {
      return res.status(400).json({
        msg: "Only Hotel Admin allowed to access this resource",
      });
    }
    const {
      hotelName,
      country,
      city,
      rentPerDay,
      maxCount,
      description,
      phoneNumber,
      roomType,
      location,
    } = req.body;

    const images = req.files;
    const postedBy = req.user._id;
    const room = await roomModel.create({
      hotelName,
      country,
      city,
      rentPerDay,
      maxCount,
      description,
      phoneNumber,
      roomType,
      images,
      postedBy,
      location,
    });
    res.status(200).json({
      success: true,
      msg: "Room posted Successfully",
      room,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

export default roomController;
