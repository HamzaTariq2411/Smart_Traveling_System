import mongoose from "mongoose";

const bookingsSchema = new mongoose.Schema(
  {
    room: {
      type: String,
      require: true,
    },
    roomId: {
      type: String,
      require: true,
    },
    userId: {
        type: String,
        require: true,
      },
      user: {
        type: Object,
        required: true
      },
      checkInDate: {
        type: String,
        require: true,
      },
      checkOutDate: {
        type: String,
        require: true,
      },
      totalAmount: {
        type: Number,
        require: true,
      },
      totalDays: {
        type: Number,
        require: true,
      },
      accommodation: {
      type: Number,
      require: true,
    },
    booking: {
      type: String,
      require: true,
      enum: ["Pending", "Completed","Cancelled"],
      default: "Pending",
    },
      postedBy: {
        type: String,
        require: true,
      },
  },
  { timestamps: true }
);

const bookingsModel = mongoose.model("Bookings", bookingsSchema);

export default bookingsModel;
