import { StatusCodes } from "http-status-codes";

const filterObject = (obj, ...allowedFields) => {
  try {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) {
        newObj[el] = obj[el];
      }
    });
    // console.log(newObj);
    return newObj;
  } catch (error) {
    console.log("filterObject", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: "error", msg: "Internal Server Error!!" });
  }
};

export default filterObject;
