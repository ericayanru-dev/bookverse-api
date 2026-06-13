const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");

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
router.get("/:id", verifyToken, getAuthorByIdValidation(), getAuthorById);

// POST /authors
router.post("/", verifyToken, createAuthorValidation(), createAuthor);

// PUT /authors/:id
router.put("/:id", verifyToken, updateAuthorValidation(), updateAuthor);

// DELETE /authors/:id
router.delete("/:id", verifyToken, deleteAuthorValidation(), deleteAuthor);

module.exports = router;
