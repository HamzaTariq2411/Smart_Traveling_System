import roomModel from "../../models/room-Model.js";

const updateRoomController = async (req, res) => {
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
    const roomId = req.params.id;
    
    const updatedRoom = await roomModel.findByIdAndUpdate(
      roomId,
      {
        hotelName,
        country,
        city,
        rentPerDay,
        maxCount,
        description,
        phoneNumber,
        roomType,
        images,
        location,
      },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({
        success: false,
        msg: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Room updated successfully",
      room: updatedRoom,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

export default updateRoomController;
