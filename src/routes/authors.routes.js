const express = require("express");
const router = express.Router();

const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/author-controllers");

const {
  getAuthorsValidation,
  getAuthorByIdValidation,
  createAuthorValidation,
  updateAuthorValidation,
  deleteAuthorValidation,
} = require("../middleware/validation/author-validations");

// GET /authors
router.get("/", getAuthorsValidation(), getAllAuthors);

// GET /authors/:id
router.get("/:id", getAuthorByIdValidation(), getAuthorById);

// POST /authors
router.post("/", createAuthorValidation(), createAuthor);

// PUT /authors/:id
router.put("/:id", updateAuthorValidation(), updateAuthor);

// DELETE /authors/:id
router.delete("/:id", deleteAuthorValidation(), deleteAuthor);

module.exports = router;
