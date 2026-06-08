const { body, param, validationResult } = require("express-validator");

// Middleware to run validation checks
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

// GET /orders
const getOrdersValidation = () => {
  return [
    body("user")
      .notEmpty()
      .withMessage("User ID is required")
      .isMongoId()
      .withMessage("Invalid user ID"),

    validate,
  ];
};

// POST /orders
const createOrderValidation = () => {
  return [
    body("user")
      .notEmpty()
      .withMessage("User ID is required")
      .isMongoId()
      .withMessage("Invalid user ID"),

    body("items").isArray({ min: 1 }).withMessage("At least one order item is required"),

    body("items.*.book")
      .notEmpty()
      .withMessage("Book ID is required")
      .isMongoId()
      .withMessage("Invalid book ID"),

    body("items.*.quantity")
      .notEmpty()
      .withMessage("Quantity is required")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),

    body("items.*.price")
      .notEmpty()
      .withMessage("Price is required")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),

    body("totalAmount")
      .notEmpty()
      .withMessage("Total amount is required")
      .isFloat({ min: 0 })
      .withMessage("Total amount must be a positive number"),

    body("status")
      .optional()
      .isIn(["pending", "processing", "shipped", "delivered", "cancelled"])
      .withMessage("Invalid order status"),

    body("shippingAddress.street").optional().isString().withMessage("Street must be text"),

    body("shippingAddress.city").optional().isString().withMessage("City must be text"),

    body("shippingAddress.state").optional().isString().withMessage("State must be text"),

    body("shippingAddress.country").optional().isString().withMessage("Country must be text"),

    body("shippingAddress.zipCode").optional().isString().withMessage("Zip code must be text"),

    validate,
  ];
};

// DELETE /orders/:id
const deleteOrderValidation = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("Order ID is required")
      .isMongoId()
      .withMessage("Invalid order ID"),

    validate,
  ];
};

module.exports = {
  getOrdersValidation,
  createOrderValidation,
  deleteOrderValidation,
};
