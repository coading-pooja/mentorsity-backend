import { StatusCodes } from "http-status-codes";
import { otpModel } from "../../../../models/index.js";

const verifyOTP = async (req, res) => {
    try {
        const { otp, email, mobileNumber } = req.body;
        if (!otp && (!email || !mobileNumber)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ status: "error", msg: "Enter all fields" })
        }

        const otpDoc = await otpModel.findOne({ '$or': [{ email }, { mobileNumber }] })

        if (otpDoc) {
            if (otpDoc.otp === otp) {
                await otpModel.deleteOne({ _id: otpDoc._id });
                res.status(StatusCodes.OK).json({ status: "success", msg: "OTP Verified successfully" });
            }
            else {
                res.status(StatusCodes.BAD_REQUEST).json({ status: "error", msg: "OTP is incorrect" });

            }
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).json({ status: "error", msg: "OTP Expired , generate another to verify" })
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: "error", msg: "Internal server error" })

    }
}


export default { verifyOTP }