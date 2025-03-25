const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Function to send OTP email
const sendOtpEmailVerification = async (email, otp) => {
  try {
    const mailOptions = {
      from: `"MyApp Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code for Account Activation",
      replyTo: process.env.EMAIL_USER, // Allows users to reply
      html: `
        <h2>Welcome to MyApp!</h2>
        <p>Your OTP code is: <b>${otp}</b></p>
        <p>This OTP will expire in <b>5 minutes</b>.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" OTP sent:", info.messageId);
    return true;
  } catch (error) {
    console.error(" Error sending OTP email:", error.message);
    return false;
  }
};
const sendOtpForEmailVerification=async(email,otp)=>{
  try {
    const mailOptions = {
      from: `${process.env.EMAIL_USER}`,
      to: email,
      subject: "Your OTP Code for Forget Password",
      replyTo: process.env.EMAIL_USER, // Allows users to reply
      html: `
        <h2>User Forget Password Otp For NERUADHOOR!</h2>
        <p>Your OTP code is: <b>${otp}</b></p>
        <p>This OTP will expire in <b>5 minutes</b>.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" OTP sent:", info.messageId);
    return true;
  } catch (error) {
    console.error(" Error sending OTP email:", error.message);
    return false;
  }
}

module.exports = { sendOtpEmailVerification };
