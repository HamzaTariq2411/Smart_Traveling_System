import roomModel from "../../models/room-Model.js";
import bookingsModel from "../../models/bookings-Model.js";

const deleteRoomController = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "Hotel Admin") {
      return res.status(400).json({
        msg: "Only Hotel Admin allowed to access this resource",
      });
    }

    const { roomId } = req.params;

    // Delete bookings associated with the room
    await bookingsModel.deleteMany({ roomId });

    // Delete the room
    const room = await roomModel.findByIdAndDelete(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        msg: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Room and associated bookings deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

export default deleteRoomController;
