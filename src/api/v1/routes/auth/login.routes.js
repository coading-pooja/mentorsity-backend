import express from "express";
import { loginController, resetPasswordController, verifyOtpController } from "../../controllers/index.js";
import { authValidator } from "../../../../middlewares/index.js";

const router = express.Router();

const { login, forgotPassword } = loginController;
const { resetPassword } = resetPasswordController;
const { verifyOTP } = verifyOtpController
const { validateEmail, validateMobileNumber, validatePassword } = authValidator;

router.use("/login", validateEmail, validateMobileNumber, validatePassword, login);

// router.use("/logout", logout);

router.use("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/verify-otp", verifyOTP)

export default router;
