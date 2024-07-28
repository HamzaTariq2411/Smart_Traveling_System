import bookingsModel from "../../models/bookings-Model.js";

const updateBookingController = async (req, res) => {
  try {
    const { role } = req.user;
    if (role === "Flight Admin" || role === "Tourist") {
      return res.status(400).json({
        msg: "Only Hotel Admin allowed to access this resource",
      });
    }

    const { booking } = req.body;
    const bookingId = req.params.id;

    const updatedBooking = await bookingsModel.findByIdAndUpdate(
      bookingId,
      {
        booking,
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        msg: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Booking status change successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

export default updateBookingController;
