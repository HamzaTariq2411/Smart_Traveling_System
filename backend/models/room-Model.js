import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    maxCount: {
      type: Number,
      require: true,
    },
    phoneNumber: {
      type: Number,
      require: true,
    },
    rentPerDay: {
      type: Number,
      require: true,
    },
    images: [],
    currentBooking: [],
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
    roomType: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const roomModel = mongoose.model("Rooms", roomSchema);

export default roomModel;
