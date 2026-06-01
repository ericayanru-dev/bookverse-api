const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  // Password for traditional login (optional for OAuth users alone)
  password: {
    type: String,
    minlength: 6,
    // Not required because OAuth users won't have it
  },

  // OAuth Fields
  oauthProvider: {
    type: String,
    enum: ["google", "auth0", "local"],
    default: "local",
  },
  oauthId: {
    type: String,
    // Unique per provider (e.g., Google user ID)
  },

  // Role & Permissions
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  // Additional Profile Info
  avatar: String,
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  phone: String,

  // Account Status
  isVerified: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for OAuth
userSchema.index({ oauthProvider: 1, oauthId: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
