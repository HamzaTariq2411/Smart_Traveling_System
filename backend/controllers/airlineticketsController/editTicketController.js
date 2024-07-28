import ticketsModel from "../../models/tickets-Model.js";

const editTicketController = async (req, res) => {
  const { id } = req.params;
  const {
    departure,
    destination,
    departureTime,
    economyClass,
    businessClass,
    firstClass,
    arrivalTime,
    price,
  } = req.body;

  try {
    const ticket = await ticketsModel.findById(id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        msg: "Ticket not found",
      });
    }

    // Update the ticket fields
    ticket.departure = departure;
    ticket.destination = destination;
    ticket.departureTime = departureTime;
    ticket.arrivalTime = arrivalTime;
    ticket.price = price;
    ticket.economyClass= economyClass;
    ticket.businessClass = businessClass;
    ticket.firstClass = firstClass;

    // Save the updated ticket
    await ticket.save();

    res.status(200).json({
      success: true,
      msg: "Airline ticket updated successfully",
      ticket,
    });
  } catch (error) {
    console.error("Error updating airline ticket:", error.message);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export default editTicketController;
