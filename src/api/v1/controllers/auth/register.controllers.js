import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import { userModel, otpModel } from "../../../../models/index.js";
import {
  hashPassword,
  filterObject,
  activationToken,
  sendOTP,
} from "../../../../services/index.js";

const { createTransporter, sendEmail, sendSMS } = sendOTP;

dotenv.config();

const transporter = createTransporter();
const JWT_SECRET = process.env.TOCKEN_SECRET;

const register = async (req, res, next) => {
  try {
    const { email, mobileNumber, password } = req.body;

    const existingUser = await userModel.findOne({
      $or: [{ email: email }, { mobileNumber: mobileNumber }],
    });

    if (existingUser) {
      return res.status(StatusCodes.CONFLICT)
        .json({ msg: "User already registered" });
    }

    const hashedPassword = await hashPassword(password);

    const filteredBody = filterObject(
      req.body,
      "name",
      "mobileNumber",
      email && "email",
      "password",
      "pincode",
      req.body.role && "role"
    );

    filteredBody.password = hashedPassword;

    const authToken = req.header("authToken");
    if (authToken) {
      const newUser = await userModel.create(filteredBody);

      return res.status(StatusCodes.OK).json({
        msg: "Registration Successful !",
        role: newUser.role,
      });
    }

    const { OTP, token } = activationToken(filteredBody);

    if (email) {
      console.log("email", OTP);
      // const mailOptions = {
      //   from: 'OsumWeb <noreply@example.com>',
      //   to: email,
      //   subject: 'OTP to verify your account !',
      //   text: `OTP to verify your account ${OTP}.`
      // };

      // await sendEmail(transporter, mailOptions);
    } else {
      console.log("mobile number", OTP);
      // const message = `OTP to verify your account ${OTP}` ;
      // await sendSMS(mobileNumber, message)
    }

    const existingOtpDoc = await otpModel.findOne({ $or: [{ email }, { mobileNumber }] })

    if (existingOtpDoc) {
      existingOtpDoc.otp = OTP;
      existingOtpDoc.createdAt = Date.now();
      await existingOtpDoc.save()
      .then(() => {
        return res.status(StatusCodes.OK).json({
          token: token,
          msg: `OTP has been sent to the ${email ? "email" : "mobile number"}!`,
        });
      })
    }
    else {
      await otpModel
      .create({
        mobileNumber: mobileNumber,
        email: email,
        otp: OTP,
      })
      .then(() => {
        return res.status(StatusCodes.OK).json({
          token: token,
          msg: `OTP has been sent to the ${email ? "email" : "mobile number"}!`,
        });
      })
      .catch((err) => {
        console.log("otp model", err);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ status: "error", msg: "Internal Server Error!!" });
      });
    }

    
  } catch (error) {
    console.log("register", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: "error", msg: "Something went wrong!!" });
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { otp } = req.body;
    const user = req.user;

    const OTP = parseInt(otp);

    const otpData = await otpModel.findOne({
      mobileNumber: user.mobileNumber,
      otp: otp,
    });

    if (!otpData) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        msg: "Invalid OTP",
      });
    }

    const newUser = await userModel.create(user);

    // const data = {
    //   user: {
    //     userId: newUser._id,
    //     name: newUser.name,
    //     mobileNumber: newUser.mobileNumber,
    //     role: newUser.role,
    //   },
    // };

    // const authToken = jwt.sign(data, JWT_SECRET);

    return res.status(StatusCodes.OK).json({
      // jwt: authToken,
      msg: "Registration Successful please Login !",
      role: newUser.role,
    });
  } catch (error) {
    console.log("verifyOTP", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: "error", msg: "Something went wrong!!" });
  }
};

export default { register, verifyOTP };
