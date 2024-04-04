import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  pincode: {
    type: Number,
    required: true,
  },
  address: String,
  // cards: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Card",
  //   },
  // ],
  role: {
    type: String,
    enum: ["user", "admin", "N/A"],
    default: "user",
  },
  // cart: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Cart",
  //   },
  // ],
  // orders: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Order",
  //   },
  // ],
  // reviews: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Review",
  //   },
  // ],
  interests: [String],
}, { timestamps: true });


export default mongoose.model("User", userSchema);
