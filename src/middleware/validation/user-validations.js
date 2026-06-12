const { body, validationResult } = require("express-validator");

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

// POST /api/auth/register
const registerValidation = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Must be a valid email address")
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    validate,
  ];
};

// POST /api/auth/login
const loginValidation = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Must be a valid email address")
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
    validate,
  ];
};

module.exports = {
  registerValidation,
  loginValidation,
};
