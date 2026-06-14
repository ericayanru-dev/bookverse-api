const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");

const {
  getBooksValidation,
  getBookByIdValidation,
  createBookValidation,
  updateBookValidation,
  deleteBookValidation,
} = require("../middleware/validation/book-validations");

const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/book-controllers");

router.get("/", getBooksValidation(), getAllBooks);
router.get("/:id", verifyToken, getBookByIdValidation(), getBookById);
router.post("/", verifyToken, createBookValidation(), createBook);
router.put("/:id", verifyToken, updateBookValidation(), updateBook);
router.delete("/:id", verifyToken, deleteBookValidation(), deleteBook);

module.exports = router;
