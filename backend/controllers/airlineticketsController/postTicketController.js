import ticketsModel from "../../models/tickets-Model.js";
  
const ticketsController = async (req, res) => {

  const {
    airline,
    departure,
    destination,
    departureTime,
    arrivalTime,
    businessClass,
    economyClass,
    firstClass,
    price,
  } = req.body;
  const postedBy = req.user._id;
  try {    
 
    if (
      !airline ||
      !departure ||
      !destination ||
      !departureTime ||
      !businessClass||
    !economyClass||
    !firstClass||
      !arrivalTime ||
      !price
    ) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    const tempAirline = await ticketsModel.create({
      airline,
      departure,
      destination,
      departureTime,
      arrivalTime,
      businessClass,
    economyClass,
    firstClass,
      price,
      postedBy,
    });
    res.status(200).json({
      success: true,
      msg: "Airline ticket posted Successfully",
      tempAirline,
    });
  } catch (error) {
    console.error("Error creating airline ticket:", error.message);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export default ticketsController;
