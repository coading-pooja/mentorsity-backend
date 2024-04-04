import { StatusCodes } from "http-status-codes";

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const isValidMobileNumber = (mobileNumber) => {
  const mobileNumberRegex = /^\d{10}$/;
  return mobileNumberRegex.test(mobileNumber);
};

const isValidatePincode = (pincode) => {
  const pincodeRegex = /^\d{6}$/;
  return pincodeRegex.test(pincode);
};

const isValidPassword = (password) => {
  if (password.length >= 5) return true;
  return false;
  // const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  // return passwordRegex.test(password);
};

const isValidateName = (name) => {
  const nameRegex = /^[a-zA-Z]+$/;
  return nameRegex.test(name);
};

const validateName = (req, res, next) => {
  try {
    let { name } = req.body;

    if (!name || name.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Name is required" });
    }

    name = name.trim();

    if (!isValidateName(name)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid name format" });
    }

    req.body.name = name;

    next();
  } catch (error) {
    console.log("validateName", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: "error", msg: "Internal Server Error!!" });
  }
};

const validateEmail = (req, res, next) => {
  try {
    let { email } = req.body;

    if (!email || email.length === 0) {
      next();
    }
    else{
      email = email.trim();

      if (email && !isValidEmail(email)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid email format" });
      } else {
        req.body.email = email;
        next();
      }
    }
   
  } catch (error) {
    console.log("validateEmail", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: "error", msg: "Internal Server Error!!" });
  }
};

const validateMobileNumber = (req, res, next) => {
  try {
    let { mobileNumber } = req.body;

    if (!mobileNumber || mobileNumber.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Mobile number is required" });
    }

    mobileNumber = mobileNumber.trim();

    if (!isValidMobileNumber(mobileNumber)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid mobile number" });
    }

    req.body.mobileNumber = mobileNumber;

    next();
  } catch (error) {
    console.log("validateMobileNumber", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: "error", msg: "Internal Server Error!!" });
  }
};

const validatePincode = (req, res, next) => {
  try {
    let { pincode } = req.body;


    if (!pincode || pincode.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Pincode is required" });
    }

    pincode = pincode.trim();

    if (!isValidatePincode(pincode)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid Pincode" });
    }

    req.body.pincode = pincode;

    next();
  } catch (error) {
    console.log("validatePincode", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: "error", msg: "Internal Server Error!!" });
  }
};

const validatePassword = (req, res, next) => {
  try {
    let { password } = req.body;

    if (!password || password.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Password is required" });
    }

    password = password.trim();

    if (!isValidPassword(password)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid password" });
    }

    req.body.password = password;

    next();
  } catch (error) {
    console.log("validatePassword", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: "error", msg: "Internal Server Error!!" });
  }

  //  req.body.password = password;

  //  next();
};

export default {
  validateName,
  validateEmail,
  validateMobileNumber,
  validatePincode,
  validatePassword,
};
