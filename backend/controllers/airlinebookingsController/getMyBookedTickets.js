import bookTicketModel from "../../models/bookTicket-Model.js";

const getMyBookedTickets = async (req, res) => {

  const myBookedTickets = await bookTicketModel.find({ userId: req.user._id });
  return res.send(myBookedTickets);
};

export default getMyBookedTickets;
