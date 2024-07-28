import bookingsModel from "../../models/bookings-Model.js";
import roomModel from "../../models/room-Model.js";

const bookingsController = async (req, res) => {
  try {
    const {
      postedBy,
      room,
      roomId,
      user,
      userId,
      checkInDate,
      checkOutDate,
      accommodation,
      totalAmount,
      totalDays,
    } = req.body;
    const bookings = await bookingsModel.create({
      postedBy,
      room,
      user,
      roomId,
      userId,
      checkInDate,
      checkOutDate,
      accommodation,
      totalAmount,
      totalDays,
    });
    res.status(200).json({
        success: true,
        msg: "Booked Successfully",
        bookings,
      });
      const roomtemp= await roomModel.findOne({_id:roomId})
      roomtemp.currentBooking.push({bookingsId:bookings._id,checkInDate:checkInDate,checkOutDate:checkOutDate,userId:userId,status:bookings.status});
      
      await roomtemp.save();

  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

export default bookingsController;
