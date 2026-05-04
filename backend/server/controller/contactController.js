const emailService = require("../config/emailService"); // your template file
const { Resend } = require("resend");
require("dotenv").config();

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 1) Email to admin (Pulled from .env)
    const adminEmail = await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New contact message from ${firstName} ${lastName}`,
      replyTo: email, // ⭐ MAGIC TRICK: If you hit 'Reply', it emails the user directly!
      html: emailService.contactAdminTemplate({
        firstName,
        lastName,
        email,
        phone,
        message,
      }),
    });

    // Resend returns an error object if it fails
    if (adminEmail.error) {
      console.error("Admin email failed to send:", adminEmail.error);
      throw new Error(adminEmail.error.message);
    }

    // 2) Email to user (confirmation)
    const userEmail = await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "We received your message",
      html: emailService.contactUserTemplate({ firstName }),
    });

    if (userEmail.error) {
      console.error("User confirmation email failed:", userEmail.error);
      // We don't throw an error here because the admin still got the message successfully.
    }

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