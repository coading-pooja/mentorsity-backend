import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";

dotenv.config();

const JWT_SECRET = process.env.TOCKEN_SECRET;

const tokenValidator = async (req, res, next) => {
  try {
    const token = req.header("authToken");

    if (!token) {
      next();
    } else {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "Unauthorized" });
        }
        // console.log(decoded);
        req.user = decoded.user;
        next();
      });
    }
  } catch (error) {
    console.log("tokenValidator", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: "error", msg: "Internal Server Error!!" });
  }
};

export default tokenValidator;
