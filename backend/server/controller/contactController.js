// controller/contactController.js
const emailService = require("../config/emailService"); // your file above
const nodemailer = require("nodemailer");
require("dotenv").config();

// create a local transporter here because emailService doesn't export it
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const submitContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, email and message are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // 1) Email to admin (you)
    await transporter.sendMail({
      from: `"Neuradhoor Contact" <${process.env.EMAIL_USER}>`,
      to: "kartikdhoor121@gmail.com",
      subject: `New contact message from ${firstName} ${lastName}`,
      html: emailService.contactAdminTemplate({
        firstName,
        lastName,
        email,
        phone,
        message,
      }),
    });

    // 2) Email to user (confirmation)
    await transporter.sendMail({
      from: `"Neuradhoor Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your message",
      html: emailService.contactUserTemplate({ firstName }),
    });

    return res.status(200).json({
      success: true,
      message:
        "Thank you! We received your message and will respond in a few days.",
    });
  } catch (err) {
    console.error("Contact submit error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending your message",
    });
  }
};

module.exports = { submitContact };
