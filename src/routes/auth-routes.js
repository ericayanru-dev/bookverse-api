const express = require("express");
const passport = require("passport");
const { verifyToken } = require("../middleware/auth");
const { register, login, logout, getMe, googleCallback } = require("../controllers/authController");

const router = express.Router();

// POST /api/auth/register
router.post("/register", register);
// POST /api/auth/login
router.post("/login", login);
// POST /api/auth/logout
router.post("/logout", logout);
// GET /api/auth/me
router.get("/me", verifyToken, getMe);

// Google oAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/auth/google/failure",
    session: false,
  }),
  googleCallback
);
router.get("/google/failure", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Google authentication failed.",
  });
});

module.exports = router;
