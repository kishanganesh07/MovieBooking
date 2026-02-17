import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
   showDate: { type: String, required: true },
  showTime: { type: String, required: true },
  bookedSeats: [{ type: String, required: true }], 
  totalPrice: { type: Number, required: true },
transactionId: String,
  },

  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
