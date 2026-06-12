const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Signs a JWT and sets it as httpOnly cookie on response
const issueToken = function (res, user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  // 7 day expiry is pretty long, maybe switch to 1d?
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTTPS in prod
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  });

  return token;
};

// POST /api/auth/register
const register = async function (req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "name, email, and password are required.",
      });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "Email already in use.",
      });
    }

    // Create user
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashed,
      oauthProvider: "local",
      isVerified: false,
    });

    issueToken(res, user);

    return res.status(200).json({
      success: true,
      message: "Logged in.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: e.message,
    });
  }
};

// POST /api/auth/login
const login = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({
      email,
      oauthProvider: "local",
    });
    if (!user || !user.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    user.lastLogin = new Date();
    await user.save();

    issueToken(res, user);

    return res.status(200).json({
      success: true,
      message: "Logged in.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: e.message,
    });
  }
};

// POST /api/auth/logout
const logout = function (req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out.",
  });
};

// GET /api/auth/me
//  Depends on verifyToken middleware
const getMe = async function (req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: e.message,
    });
  }
};

/**
 *  googleCallback
 *
 *    GET /api/auth/google/callback
 *    Called by passport after Google redirect
 *
 *    passport-google-oauth20 attaches the user
 *      to req.user before this runs.
 */
const googleCallback = function (req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Google auth failed.",
    });
  }

  issueToken(res, req.user);

  res.redirect(process.env.FRONTEND_URL || "/");
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  googleCallback,
};
