import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { userModel } from "../../../../models/index.js";


dotenv.config();

const JWT_SECRET = process.env.TOCKEN_SECRET;

const login = async (req, res, next) => {
    try {
        const { email, mobileNumber, password } = req.body;

        const user = await userModel.findOne({
            $or: [{ email: email }, { mobileNumber: mobileNumber }],
        });

        if (!user) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ msg: "Invalid email/mobile number or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ msg: "Invalid email/mobile number or password" });
        }

        const data = {
            user: {
                userId: user._id,
                name: user.name,
                mobileNumber: user.mobileNumber,
                role: user.role,
            },
        };

        const authToken = jwt.sign(data, JWT_SECRET);

        return res.status(StatusCodes.OK).json({
            jwt: authToken,
            msg: "Login Successful !",
            role: user.role,
        });
    } catch (error) {
        console.log("login", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ status: "error", msg: "Something went wrong!!" });
    }
}


// const logout = async (req, res, next) => {
//   res.status(StatusCodes.OK).json({ msg: "done" });
// };

const forgotPassword = async (req, res, next) => {
    res.status(StatusCodes.OK).json({ msg: "done" });
};







const generateOTP = () => {
    return Math.floor(Math.random() * 9000) + 1000
}

export default { login, forgotPassword };
