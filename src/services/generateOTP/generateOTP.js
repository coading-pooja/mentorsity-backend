import otpGenerator from "otp-generator";
import { StatusCodes } from "http-status-codes";

const generateOTP = () => {
  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    return parseInt(otp, 10);
  } catch (error) {
    console.log("generateOTP", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: "error", msg: "Internal Server Error!!" });
  }
};

export default generateOTP;
