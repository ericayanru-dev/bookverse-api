const mongoose = require("mongoose");
const Book = require("../../src/models/book");
require("dotenv").config();

describe("Book Model", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      await Book.deleteOne({ isbn: "978-0743273565" });
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      throw error;
    }
  }, 60000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // ====================== SUCCESS TESTS ======================
  test("should create & save a book successfully", async () => {
    const bookData = {
      title: "The Great Gatsby",
      isbn: "978-0743273565",
      description: "A classic novel about the American Dream",
      price: 12.99,
      stock: 50,
      genre: "Fiction",
      author: new mongoose.Types.ObjectId(), // Mock author ID
      publishedYear: 1925,
      coverImage: "https://example.com/gatsby.jpg",
    };

    const book = new Book(bookData);
    const savedBook = await book.save();

    expect(savedBook._id).toBeDefined();
    expect(savedBook.title).toBe(bookData.title);
    expect(savedBook.isbn).toBe(bookData.isbn);
    expect(savedBook.price).toBe(bookData.price);
    expect(savedBook.stock).toBe(bookData.stock);
  });

  // ====================== VALIDATION TESTS ======================
  test("should fail if title is missing", async () => {
    const bookData = {
      isbn: "978-0743273565",
      price: 12.99,
      stock: 50,
      author: new mongoose.Types.ObjectId(),
    };

    await expect(new Book(bookData).save()).rejects.toThrow();
  });

  test("should fail if price is negative", async () => {
    const bookData = {
      title: "Invalid Book",
      isbn: "978-1234567890",
      price: -5.99,
      stock: 10,
      author: new mongoose.Types.ObjectId(),
    };

    await expect(new Book(bookData).save()).rejects.toThrow();
  });

  test("should fail if stock is negative", async () => {
    const bookData = {
      title: "Invalid Book",
      isbn: "978-1234567890",
      price: 10,
      stock: -1,
      author: new mongoose.Types.ObjectId(),
    };

    await expect(new Book(bookData).save()).rejects.toThrow();
  });

  // ====================== BUSINESS LOGIC TESTS ======================
  test("should have default createdAt date", async () => {
    await Book.deleteOne({ isbn: "978-1111111111" });
    const book = new Book({
      title: "Test Book",
      isbn: "978-1111111111",
      price: 9.99,
      stock: 20,
      author: new mongoose.Types.ObjectId(),
    });

    const savedBook = await book.save();
    expect(savedBook.createdAt).toBeDefined();
    expect(savedBook.createdAt).toBeInstanceOf(Date);
  });
});
