import bookTicketModel from "../../models/bookTicket-Model.js";
import ticketsModel from "../../models/tickets-Model.js";

const bookTicketController = async (req, res) => {
  try {
    const {
      user,
      userId,
      flightId,
      flight,
      bookingDate,
      numberOfPassengers,
      departureTime,
      totalPrice,
      flightType,
      ticketClass,
      postedBy
    } = req.body;

    // Fetch the current ticket details
    const ticket = await ticketsModel.findById(flightId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        msg: "Ticket not found",
      });
    }

    // Update the appropriate class count
    switch (ticketClass) {
      case 'Business-Class':
        if (ticket.businessClass < numberOfPassengers) {
          return res.status(400).json({
            success: false,
            msg: "Not enough business class seats available",
          });
        }
        ticket.businessClass -= numberOfPassengers;
        break;
      case 'Economy-Class':
        if (ticket.economyClass < numberOfPassengers) {
          return res.status(400).json({
            success: false,
            msg: "Not enough economy class seats available",
          });
        }
        ticket.economyClass -= numberOfPassengers;
        break;
      case 'First-Class':
        if (ticket.firstClass < numberOfPassengers) {
          return res.status(400).json({
            success: false,
            msg: "Not enough first class seats available",
          });
        }
        ticket.firstClass -= numberOfPassengers;
        break;
      default:
        return res.status(400).json({
          success: false,
          msg: "Invalid ticket class",
        });
    }

    // Save the updated ticket details
    await ticket.save();

    // Create the booking
    const bookings = await bookTicketModel.create({
      user,
      userId,
      flight,
      flightId,
      bookingDate,
      numberOfPassengers,
      departureTime,
      totalPrice,
      flightType,
      ticketClass,
      postedBy
    });

    res.status(200).json({
      success: true,
      msg: "Booked Successfully",
      bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

export default bookTicketController;
