const User = require("../modules/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailService = require("../config/emailService");

const JWT_SECRET = process.env.SECRET_KEY;
const SALT_ROUNDS = 10;
const OTP_EXPIRY_MINUTES = 5;
const OTP_MAX_ATTEMPTS = 5;

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const getOtpExpiryDate = () => {
  return new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
};

const sanitizeUser = (user) => {
  const obj = user.toObject();
  delete obj.password;
  delete obj.otpHash;
  delete obj.otpPurpose;
  delete obj.otpExpiresAt;
  delete obj.otpLastSentAt;
  delete obj.otpAttemptCount;
  delete obj.otpVerifiedAt;
  return obj;
};

const clearOtpFields = (user) => {
  user.otpHash = null;
  user.otpPurpose = null;
  user.otpExpiresAt = null;
  user.otpLastSentAt = null;
  user.otpAttemptCount = 0;
  user.otpVerifiedAt = null;
};

const createAuthToken = (user, expiresIn = "24d") => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      image: user.image,
      userType: user.userType,
    },
    JWT_SECRET,
    { expiresIn }
  );
};

const register = async (req, res) => {
  try {
    let validation = "";
    if (!req.body.name) validation += "name is required ";
    if (!req.body.email) validation += "email is required ";
    if (!req.body.password) validation += "password is required ";

    if (validation) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: validation,
      });
    }

    const email = String(req.body.email).trim().toLowerCase();

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, SALT_ROUNDS);
    const otpExpiresAt = getOtpExpiryDate();

    const user = new User({
      name: req.body.name,
      email,
      password: hashedPassword,
      otpHash,
      otpPurpose: "email_verification",
      otpExpiresAt,
      otpLastSentAt: new Date(),
      otpAttemptCount: 0,
      emailVerified: false,
    });

    const savedUser = await user.save();

    const token = createAuthToken(savedUser, "24d");

    res.status(200).send({
      success: true,
      status: 200,
      message: "New user is created",
      data: sanitizeUser(savedUser),
      token,
    });

    try {
      await emailService.sendOtpEmailVerification(savedUser.email, otp);
      console.log("Verification OTP sent to:", savedUser.email);
    } catch (emailErr) {
      console.error("Verification OTP email failed:", emailErr.message);
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    let validation = "";
    if (!req.body.email) validation += "email is required ";
    if (!req.body.password) validation += "password is required ";

    if (validation) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: validation,
      });
    }

    const email = String(req.body.email).trim().toLowerCase();

    const user = await User.findOne({ email, status: true }).exec();

    if (!user) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "Invalid email or password",
      });
    }

    const token = createAuthToken(user, "24d");

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Login Successful",
      data: sanitizeUser(user),
      token,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Error during login: " + err.message,
    });
  }
};

const profilePasswordChange = async (req, res) => {
  try {
    let validation = "";
    if (!req.body._id) validation += "_id is required ";
    if (!req.body.password) validation += "old password is required ";
    if (!req.body.newPassword) validation += "new password is required ";

    if (validation) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: validation,
      });
    }

    const user = await User.findOne({ _id: req.body._id, status: true }).exec();

    if (!user) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "user of this _id does not exist",
      });
    }

    const isOldPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (!isOldPasswordValid) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "Old password is incorrect",
      });
    }

    if (req.body.password === req.body.newPassword) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "New password must be different from old password",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, SALT_ROUNDS);
    user.password = hashedPassword;

    await user.save();

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Password changed successfully",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};

const findOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.decoded._id, status: true }).exec();

    if (!user) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "no users Exists",
      });
    }

    return res.status(200).send({
      success: true,
      status: 200,
      message: "user",
      data: sanitizeUser(user),
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    let validation = "";
    if (!req.body._id) validation += "_id is required ";

    if (validation) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: validation,
      });
    }

    const user = await User.findOne({ _id: req.body._id }).exec();

    if (!user) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "user does not exist",
      });
    }

    user.status = false;
    await user.save();

    return res.status(200).send({
      success: true,
      status: 200,
      message: "user is deleted",
      data: sanitizeUser(user),
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};

const profileUpdate = async (req, res) => {
  try {
    if (!req.decoded) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "decoded data is required",
      });
    }

    const user = await User.findOne({ _id: req.decoded._id, status: true }).exec();

    if (!user) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "user does not exist",
      });
    }

    const updates = req.body.userData ? JSON.parse(req.body.userData) : {};

    if (updates.name) user.name = updates.name;
    if (updates.email) user.email = String(updates.email).trim().toLowerCase();
    if (updates.phone) user.phone = updates.phone;
    if (updates.introduction) user.introduction = updates.introduction;

    if (req.file && req.cloudinaryFile) {
      user.image = req.cloudinaryFile.cloudinaryUrl;
    }

    await user.save();

    const token = createAuthToken(user, "24d");

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Update done",
      data: sanitizeUser(user),
      token,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};

const otpConfirmation = async (req, res) => {
  try {
    let validation = "";
    if (!req.body.otp) validation += "otp is required ";
    if (!req.body._id) validation += "_id is required ";

    if (validation) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: validation,
      });
    }

    const user = await User.findOne({ _id: req.body._id, status: true }).exec();

    if (!user) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "User does not exist",
      });
    }

    if (!user.otpHash || user.otpPurpose !== "email_verification") {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "No active verification OTP found",
      });
    }

    if (!user.otpExpiresAt || new Date(user.otpExpiresAt) < new Date()) {
      const newOtp = generateOtp();
      const newOtpHash = await bcrypt.hash(newOtp, SALT_ROUNDS);

      user.otpHash = newOtpHash;
      user.otpPurpose = "email_verification";
      user.otpExpiresAt = getOtpExpiryDate();
      user.otpLastSentAt = new Date();
      user.otpAttemptCount = 0;

      await user.save();

      try {
        await emailService.sendOtpEmailVerification(user.email, newOtp);
      } catch (emailErr) {
        console.error("Resend verification OTP email failed:", emailErr.message);
      }

      return res.status(400).json({
        success: false,
        status: 400,
        message: "OTP expired, a new OTP has been sent",
      });
    }

    if ((user.otpAttemptCount || 0) >= OTP_MAX_ATTEMPTS) {
      return res.status(429).json({
        success: false,
        status: 429,
        message: "Too many invalid OTP attempts. Please request a new OTP.",
      });
    }

    const isOtpValid = await bcrypt.compare(String(req.body.otp), user.otpHash);

    if (!isOtpValid) {
      user.otpAttemptCount = (user.otpAttemptCount || 0) + 1;
      await user.save();

      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid OTP",
      });
    }

    user.emailVerified = true;
    user.otpVerifiedAt = new Date();
    clearOtpFields(user);

    await user.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Email is verified",
      data: sanitizeUser(user),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Server error: " + err.message,
    });
  }
};

const forgotPasswordRequest = async (req, res) => {
  try {
    let validation = "";
    if (!req.body.email) validation += "email is required ";

    if (validation) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: validation,
      });
    }

    const email = String(req.body.email).trim().toLowerCase();

    const genericMessage =
      "If an account with this email exists, an OTP has been sent to the registered email address.";

    const user = await User.findOne({ email, status: true }).exec();

    if (!user) {
      return res.status(200).json({
        success: true,
        status: 200,
        message: genericMessage,
      });
    }

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, SALT_ROUNDS);

    user.otpHash = otpHash;
    user.otpPurpose = "forgot_password";
    user.otpExpiresAt = getOtpExpiryDate();
    user.otpLastSentAt = new Date();
    user.otpAttemptCount = 0;
    user.otpVerifiedAt = null;

    await user.save();

    try {
      if (emailService.sendOtpForEmailVerification) {
        await emailService.sendOtpForEmailVerification(user.email, otp);
      } else if (emailService.sendForgotPasswordOtpEmail) {
        await emailService.sendForgotPasswordOtpEmail(user.email, otp);
      } else {
        throw new Error("Forgot password OTP email sender is not configured");
      }
    } catch (emailErr) {
      console.error("Forgot password OTP email failed:", emailErr.message);
      return res.status(500).json({
        success: false,
        status: 500,
        message: "Unable to send OTP email right now",
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: genericMessage,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};

const resetPasswordWithOtp = async (req, res) => {
  try {
    let validation = "";
    if (!req.body.email) validation += "email is required ";
    if (!req.body.otp) validation += "otp is required ";
    if (!req.body.newPassword) validation += "newPassword is required ";
    if (!req.body.confirmPassword) validation += "confirmPassword is required ";

    if (validation) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: validation,
      });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "new password and confirm password do not match",
      });
    }

    const email = String(req.body.email).trim().toLowerCase();

    const user = await User.findOne({ email, status: true }).exec();

    if (!user) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid OTP or email",
      });
    }

    if (!user.otpHash || user.otpPurpose !== "forgot_password") {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "No active forgot password OTP found",
      });
    }

    if (!user.otpExpiresAt || new Date(user.otpExpiresAt) < new Date()) {
      clearOtpFields(user);
      await user.save();

      return res.status(400).json({
        success: false,
        status: 400,
        message: "OTP expired. Please request a new OTP.",
      });
    }

    if ((user.otpAttemptCount || 0) >= OTP_MAX_ATTEMPTS) {
      return res.status(429).json({
        success: false,
        status: 429,
        message: "Too many invalid OTP attempts. Please request a new OTP.",
      });
    }

    const isOtpValid = await bcrypt.compare(String(req.body.otp), user.otpHash);

    if (!isOtpValid) {
      user.otpAttemptCount = (user.otpAttemptCount || 0) + 1;
      await user.save();

      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid OTP or email",
      });
    }

    const isSameAsOldPassword = await bcrypt.compare(
      req.body.newPassword,
      user.password
    );

    if (isSameAsOldPassword) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "New password must be different from old password",
      });
    }

    user.password = await bcrypt.hash(req.body.newPassword, SALT_ROUNDS);
    clearOtpFields(user);

    await user.save();

    try {
      if (emailService.passwordResetSuccessTemplate || emailService.sendPasswordResetSuccessEmail) {
        if (emailService.sendPasswordResetSuccessEmail) {
          await emailService.sendPasswordResetSuccessEmail(user.email);
        }
      }
    } catch (emailErr) {
      console.error("Password reset success email failed:", emailErr.message);
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Password has been reset successfully. Please login again.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};

module.exports = {
  register,
  login,
  profilePasswordChange,
  findOneUser,
  deleteUser,
  profileUpdate,
  otpConfirmation,
  forgotPasswordRequest,
  resetPasswordWithOtp,
};