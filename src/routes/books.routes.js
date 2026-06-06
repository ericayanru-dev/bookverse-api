const express = require("express");
const router = express.Router();
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
router.get("/:id", getBookByIdValidation(), getBookById);
router.post("/", createBookValidation(), createBook);
router.put("/:id", updateBookValidation(), updateBook);
router.delete("/:id", deleteBookValidation(), deleteBook);

module.exports = router;
