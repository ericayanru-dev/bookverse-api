const { body, param } = require('express-validator');

// Validate order data
const orderValidationRules = () => {
  return [
    body('user')
      .notEmpty()
      .withMessage('User ID is required')
      .isMongoId()
      .withMessage('Invalid user ID'),

    body('books')
      .isArray({ min: 1 })
      .withMessage('At least one book is required'),

    body('books.*.bookId')
      .isMongoId()
      .withMessage('Invalid book ID'),

    body('books.*.quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be at least 1'),

    body('totalPrice')
      .notEmpty()
      .withMessage('Total price is required')
      .isFloat({ min: 0 })
      .withMessage('Total price must be a positive number'),

    body('status')
      .optional()
      .isIn([
        'pending',
        'processing',
        'shipped',
        'delivered',
        'cancelled'
      ])
      .withMessage('Invalid order status')
  ];
};

// Validate MongoDB order ID
const validateOrderId = () => {
  return [
    param('id')
      .isMongoId()
      .withMessage('Invalid order ID')
  ];
};

module.exports = {
  orderValidationRules,
  validateOrderId
};