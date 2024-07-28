import roomModel from "../../models/room-Model.js";

const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomModel.find();
    return res.send(rooms);
  } catch (error) {
    console.log("error in getAllRooms controller", error);
  }
};
export default getAllRooms;
