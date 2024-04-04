import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600
  }
});


export default mongoose.model("OTP", otpSchema);