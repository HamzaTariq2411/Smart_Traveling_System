import ticketsModel from "../../models/tickets-Model.js";

const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketsModel.find();
    return res.send(tickets);
  } catch (error) {
    console.log("error in getAllTickets controller", error);
  }
};
export default getAllTickets;
