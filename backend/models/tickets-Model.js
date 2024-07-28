import mongoose from "mongoose";

const ticketsSchema = new mongoose.Schema(
  {
    airline: {
      type: String,
      require: true,
    },
    departure: {
      type: String,
      require: true,
    },
    destination: { type: String, require: true },
    departureTime: { type: Date, require: true },
    arrivalTime: { type: Date, require: true },
    businessClass: { type: Number, require: true },
    economyClass: { type: Number, require: true },
    firstClass: { type: Number, require: true },
    price: { type: Number, require: true },
    postedBy: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const ticketsModel = mongoose.model("Airline", ticketsSchema);

export default ticketsModel;
