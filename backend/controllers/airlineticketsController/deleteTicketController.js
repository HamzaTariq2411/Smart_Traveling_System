import ticketsModel from "../../models/tickets-Model.js";
import bookTicketModel from "../../models/bookTicket-Model.js";

const deleteTicketController = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "Flight Admin") {
      return res.status(400).json({
        msg: "Only Flight Admin allowed to access this resource",
      });
    }

    const { ticketId } = req.params;

    // Delete bookings associated with the ticket
    await bookTicketModel.deleteMany({ ticketId });

    // Delete the ticket
    const ticket = await ticketsModel.findByIdAndDelete(ticketId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        msg: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Ticket and associated bookings deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

export default deleteTicketController;
