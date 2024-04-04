import express from 'express';
import { registerController } from "../../controllers/index.js";
import  { authValidator, tokenValidator, otpTokenValidator } from "../../../../middlewares/index.js";

const router = express.Router();

// const { register } = registerController;
const { validateName, validateEmail, validateMobileNumber, validatePincode, validatePassword } = authValidator;
const {register, verifyOTP } = registerController

router.post('/registration', tokenValidator,  validateName, validateEmail, validateMobileNumber, validatePincode, validatePassword, register);

router.post('/verifyRegistration', otpTokenValidator, verifyOTP)

export default router;