import { StatusCodes } from "http-status-codes";

import { otpModel, userModel } from "../../../../models/index.js";
import { generateOTP, sendOTP } from "../../../../services/index.js";

const resetPassword = async (req, res, next) => {
    try {
        const { email, mobileNumber } = req.body;

        const user = await userModel.findOne({ "$or": [{ email }, { mobileNumber }] });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ status: "error", msg: "User not found" })
        }

        const otp = generateOTP();
        const existingOtpDoc = await otpModel.findOne({ $or: [{ email }, { mobileNumber }] })


        //check whether the document is already exists or not
        // if its exist update the existing document with new otp
        if (existingOtpDoc) {
            existingOtpDoc.otp = otp;
            existingOtpDoc.createdAt = Date.now();
            await existingOtpDoc.save()
        }
        else {
            await otpModel.create({ email, mobileNumber, otp });
        }


        // send OTP to email 
        if (email) {
            const mailOptions = {
                from: 'OsumWeb <noreply@example.com>', // sender address
                to: email, // list of receivers
                subject: 'Reset Password', // Subject line
                text: `Please enter the OTP to reset your password OTP is :${otp}`, // plain text body
            }

            const info = await sendOTP.sendEmail(sendOTP.createTransporter(), mailOptions)


            if (info.accepted) {
                return res.status(StatusCodes.OK).json({ status: "success", msg: "Reset password link sent successfully" });
            }
            else if (info.rejected) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: "error", msg: "Cannot send reset password mail" })
            }
        }
        // send OTP to mobile number
        else if (mobileNumber) {

            const message = `Your Verification Code is ${otp}`
            // user = await userModel.findOne({ mobileNumber: resetContact })
            const response = await sendOTP.sendSMS(mobileNumber, message)
            if (response.return) {
                res.status(StatusCodes.OK).json({ status: "success", msg: "OTP has been successfully sent to mobile number" })
            }
            else {
                res.status(StatusCodes.BAD_REQUEST).json({ status: "error", msg: "Cannot sent OTP to mobile number" })
            }
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: "error", msg: error })
    }
};

export default { resetPassword };