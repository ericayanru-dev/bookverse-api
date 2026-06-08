const Book = require("../models/book");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("author", "name");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author", "name");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, isbn, description, price, stock, genre, author, publishedYear, coverImage } =
      req.body;

    const body = {};

    if (title) body.title = title.trim();
    if (isbn) body.isbn = isbn.trim();
    if (description) body.description = description.trim();
    if (price) body.price = price;
    if (stock) body.stock = stock;
    if (genre) body.genre = genre.trim();
    if (author) body.author = author;
    if (publishedYear) body.publishedYear = publishedYear;
    if (coverImage) body.coverImage = coverImage.trim();
    body.updatedAt = Date.now();

    const book = new Book(body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, isbn, description, price, stock, genre, author, publishedYear, coverImage } =
      req.body;

    const body = {};

    if (title) body.title = title.trim();
    if (isbn) body.isbn = isbn.trim();
    if (description) body.description = description.trim();
    if (price) body.price = price;
    if (stock) body.stock = stock;
    if (genre) body.genre = genre.trim();
    if (author) body.author = author;
    if (publishedYear) body.publishedYear = publishedYear;
    if (coverImage) body.coverImage = coverImage.trim();
    body.updatedAt = Date.now();

    const book = await Book.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
