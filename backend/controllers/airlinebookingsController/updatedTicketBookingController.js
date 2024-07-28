import bookTicketModel from "../../models/bookTicket-Model.js";

const updateTicketBookingController = async (req, res) => {
  try {
    const { role } = req.user;
    if (role === "Hotel Admin" || role === "Tourist") {
      return res.status(400).json({
        msg: "Only Flight Admin allowed to access this resource",
      });
    }

    const { booking } = req.body;
    const bookingId = req.params.id;

    const updatedBooking = await bookTicketModel.findByIdAndUpdate(
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

export default updateTicketBookingController;
