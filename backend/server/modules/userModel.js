const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
  },
  email: {
    type: String,
    default: "",
    trim: true,
    lowercase: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  userType: {
    type: Number,
    default: 2,
  },
  introduction: {
    type: String,
    default: "",
  },
  phone: {
    type: Number,
    default: 0,
  },

  emailVerified: {
    type: Boolean,
    default: false,
  },

  status: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  otpHash: {
    type: String,
    default: null,
  },
  otpPurpose: {
    type: String,
    enum: ["email_verification", "forgot_password", null],
    default: null,
  },
  otpExpiresAt: {
    type: Date,
    default: null,
  },
  otpLastSentAt: {
    type: Date,
    default: null,
  },
  otpAttemptCount: {
    type: Number,
    default: 0,
  },
  otpVerifiedAt: {
    type: Date,
    default: null,
  },
});

userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("user", userSchema);