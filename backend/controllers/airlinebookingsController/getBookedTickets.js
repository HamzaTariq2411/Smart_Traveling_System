import bookTicketModel from "../../models/bookTicket-Model.js";

const getBookedTickets= async (req, res) => {

  const bookedTickets = await bookTicketModel.find({ postedBy: req.user._id });
  return res.send(bookedTickets);
};

export default getBookedTickets;
