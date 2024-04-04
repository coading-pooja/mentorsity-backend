import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fast2sms from "fast-two-sms";

dotenv.config();

const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter;
};

const sendEmail = async (transporter, mailOptions) => {
  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.log("sendEmail", error);
    throw new Error("Failed to send email");
  }
};

const sendSMS = async (mobileNumber, message) => {
  try {
    const options = {
      authorization: process.env.SMS_API_KEY, // Add your Fast2SMS API key here
      message: message,
      numbers: ["917353352894"],
    };

    // Send SMS using Fast2SMS API
    const response = await fast2sms.sendMessage(options);
    console.log("SMS response:", response);
    return response;
  } catch (error) {
    console.log("sendSMS", error);
    throw new Error("Failed to send email");
  }
};

export default { createTransporter, sendEmail, sendSMS };
