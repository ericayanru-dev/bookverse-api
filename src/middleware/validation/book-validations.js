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

// GET /books
const getBooksValidation = () => {
  return [validate];
};

// GET /books/:id
const getBookByIdValidation = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("Book ID is required")
      .isMongoId()
      .withMessage("Invalid book ID"),

    validate,
  ];
};

// POST /books
const createBookValidation = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),

    body("isbn").trim().notEmpty().withMessage("ISBN is required"),

    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),

    body("stock")
      .notEmpty()
      .withMessage("Stock is required")
      .isInt({ min: 0 })
      .withMessage("Stock must be a positive number"),

    body("author")
      .notEmpty()
      .withMessage("Author ID is required")
      .isMongoId()
      .withMessage("Invalid author ID"),

    body("description").optional().isString().withMessage("Description must be text"),

    body("genre").optional().isString().withMessage("Genre must be text"),

    body("publishedYear")
      .optional()
      .isInt({ min: 1000, max: new Date().getFullYear() })
      .withMessage("Invalid published year"),

    body("coverImage").optional().isString().withMessage("Cover image must be text"),

    validate,
  ];
};

// PUT /books/:id
const updateBookValidation = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("Book ID is required")
      .isMongoId()
      .withMessage("Invalid book ID"),

    body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),

    body("isbn").optional().trim().notEmpty().withMessage("ISBN cannot be empty"),

    body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),

    body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a positive number"),

    body("author").optional().isMongoId().withMessage("Invalid author ID"),

    body("publishedYear")
      .optional()
      .isInt({ min: 1000, max: new Date().getFullYear() })
      .withMessage("Invalid published year"),

    validate,
  ];
};

// DELETE /books/:id
const deleteBookValidation = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("Book ID is required")
      .isMongoId()
      .withMessage("Invalid book ID"),

    validate,
  ];
};

module.exports = {
  getBooksValidation,
  getBookByIdValidation,
  createBookValidation,
  updateBookValidation,
  deleteBookValidation,
};