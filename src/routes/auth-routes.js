const express = require("express");
const passport = require("passport");
const { googleCallback } = require("../controllers/authController");

const router = express.Router();

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
