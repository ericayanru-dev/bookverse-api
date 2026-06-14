const { body, param, validationResult } = require("express-validator");

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

// DELETE /users/:id
const deleteUserValidation = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("User ID is required")
      .isMongoId()
      .withMessage("Invalid user ID"),
    validate,
  ];
};

const updateUserRules = () => {
  return [
    body("name")
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Name must be between 1 and 100 characters."),

    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage("Invalid email address.")
      .normalizeEmail(),

    body("phone").optional().trim().isMobilePhone().withMessage("Invalid phone number."),

    body("avatar").optional().trim().isURL().withMessage("Avatar must be a valid URL."),

    // Not sure what the format is. Wrote validation for a dict, easier to parse later:
    //
    //    "shippingAddress": {
    //      "street": "123 Main St",
    //      "city": "Toronto",
    //      "state": "ON",
    //      "country": "Canada",
    //      "zipCode": "M1A 1A1"
    //    }
    //
    // Full validation for format above:
    ////////////////////////////////////////
    // body("shippingAddress.street")
    //   .optional()
    //   .trim()
    //   .notEmpty()
    //   .withMessage("Street cannot be empty."),
    // body("shippingAddress.city")
    //   .optional()
    //   .trim()
    //   .notEmpty()
    //   .withMessage("City cannot be empty."),
    // body("shippingAddress.state")
    //   .optional()
    //   .trim()
    //   .notEmpty()
    //   .withMessage("State cannot be empty."),
    // body("shippingAddress.country")
    //   .optional()
    //   .trim()
    //   .notEmpty()
    //   .withMessage("Country cannot be empty."),
    // body("shippingAddress.zipCode")
    //   .optional()
    //   .trim()
    //   .isPostalCode("any")
    //   .withMessage("Invalid zip code."),
    ////////////////////////////////////////
    // Validation if the shippingAddress is just a string in request body.
    //
    //    "shippingAddress": "123 Main St Toronto, ON Canada M1A 1A1"
    //
    // Delete below and uncomment above if using dict format.
    ////////////////////////////////////////
    body("shippingAddress")
      .optional()
      .trim()
      .isString()
      .withMessage("shippingAddress must be a string."),
    ////////////////////////////////////////
    validate,
  ];
};

module.exports = {
  registerValidation,
  loginValidation,
  deleteUserValidation,
  updateUserRules,
};
