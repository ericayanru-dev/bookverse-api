const Author = require("../models/author");

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().populate("books", "title isbn");
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate("books", "title isbn");
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { name, bio, birthDate, nationality, genres, books } = req.body;

    const body = {};
    if (name) body.name = name.trim();
    if (bio) body.bio = bio.trim();
    if (birthDate) body.birthDate = birthDate;
    if (nationality) body.nationality = nationality.trim();
    if (genres) body.genres = genres.map((g) => g.trim());
    if (books) body.books = books;
    body.updatedAt = Date.now();

    const author = new Author(body);
    const savedAuthor = await author.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { name, bio, birthDate, nationality, genres, books } = req.body;

    const body = {};
    if (name) body.name = name.trim();
    if (bio) body.bio = bio.trim();
    if (birthDate) body.birthDate = birthDate;
    if (nationality) body.nationality = nationality.trim();
    if (genres) body.genres = genres.map((g) => g.trim());
    if (books) body.books = books;
    body.updatedAt = Date.now();

    const author = await Author.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
