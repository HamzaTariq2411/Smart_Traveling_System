import ticketsModel from "../../models/tickets-Model.js";

const getMyPostedTickets = async (req, res) => {
  const { role } = req.user;
  if (role === "Hotel Admin" || role === "Torist") {
    return res.status(400).json({
      msg: "Hotel Admin and Torist is not allowed to access this resource",
    });
  }

  const myPostedTickets = await ticketsModel.find({ postedBy: req.user._id });
  return res.send(myPostedTickets);
};

export default getMyPostedTickets;
