import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import generateOTP from "../generateOTP/generateOTP.js";

const activationToken = (user) => {
  try {
    const OTP = generateOTP();

    const token = jwt.sign({ user }, process.env.ACTIVITAION_TOKEN, {
      expiresIn: "10m",
    });

    return { token, OTP };
  } catch (error) {
    console.log("activationToken", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: "error", msg: "Internal Server Error!!" });
  }
};

export default activationToken;
