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

// GET /authors
const getAuthorsValidation = () => {
  return [validate];
};

// GET /authors/:id
const getAuthorByIdValidation = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("Author ID is required")
      .isMongoId()
      .withMessage("Invalid author ID"),
    validate,
  ];
};

// POST /authors
const createAuthorValidation = () => {
  return [
    body("name").trim().notEmpty().withMessage("Author name is required"),
    body("bio").optional().isString().withMessage("Bio must be text"),
    body("birthDate")
      .optional()
      .isISO8601()
      .withMessage("Birth date must be a valid date (YYYY-MM-DD)"),
    body("nationality")
      .optional()
      .isString()
      .withMessage("Nationality must be text"),
    body("genres").optional().isArray().withMessage("Genres must be an array"),
    body("genres.*")
      .optional()
      .isString()
      .withMessage("Each genre must be a string"),
    body("books").optional().isArray().withMessage("Books must be an array"),
    body("books.*")
      .optional()
      .isMongoId()
      .withMessage("Each book reference must be a valid ID"),
    validate,
  ];
};

// PUT /authors/:id
const updateAuthorValidation = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("Author ID is required")
      .isMongoId()
      .withMessage("Invalid author ID"),
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Name cannot be empty"),
    body("bio").optional().isString().withMessage("Bio must be text"),
    body("birthDate")
      .optional()
      .isISO8601()
      .withMessage("Birth date must be a valid date (YYYY-MM-DD)"),
    body("nationality")
      .optional()
      .isString()
      .withMessage("Nationality must be text"),
    body("genres").optional().isArray().withMessage("Genres must be an array"),
    body("genres.*")
      .optional()
      .isString()
      .withMessage("Each genre must be a string"),
    body("books").optional().isArray().withMessage("Books must be an array"),
    body("books.*")
      .optional()
      .isMongoId()
      .withMessage("Each book reference must be a valid ID"),
    validate,
  ];
};

// DELETE /authors/:id
const deleteAuthorValidation = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("Author ID is required")
      .isMongoId()
      .withMessage("Invalid author ID"),
    validate,
  ];
};

module.exports = {
  getAuthorsValidation,
  getAuthorByIdValidation,
  createAuthorValidation,
  updateAuthorValidation,
  deleteAuthorValidation,
};
