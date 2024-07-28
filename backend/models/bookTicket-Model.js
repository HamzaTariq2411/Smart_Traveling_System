import mongoose from "mongoose";

const bookTicketSchema = new mongoose.Schema(
  {
    user: {
      type: Object,
      require: true
    },
    userId: {
      type: String,
      require: true
    },
    flightId: {
      type: String,
      require: true
    },
    flight: {
      type: Object,
      require: true
    },
    bookingDate: {
      type: Date,
      default: Date.now,
      require: true
    },
    numberOfPassengers: {
      type: Number,
      require: true
    },
    departureTime: { type: Date, require: true },
    totalPrice: {
      type: Number,
      require: true
    },
    flightType: {
      type: String,
      enum: ['one-way', 'return'],
      require: true
  },
  booking: {
    type: String,
    require: true,
    enum: ["Pending", "Completed","Cancelled"],
    default: "Pending",
  },
  ticketClass: {
    type: String,
    require: true
  },
    postedBy: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const bookTicketModel = mongoose.model("BookTicket", bookTicketSchema);

export default bookTicketModel;
