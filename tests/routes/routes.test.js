const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

const app = require("../../src/app");
const Book = require("../../src/models/book");

//========unit email for register and loging==============

let testBookIds = [];
const timestamp = Date.now();
const uniqueEmail = `eric-${timestamp}@example.com`;
// authors name
const newName = `john${timestamp}`;
// Book title//
const newTitle = `Book Tow${timestamp}`;

let cookie;
let authorId;
let bookId;
let orderId;

describe("Books Routes - GET Endpoints", () => {
  beforeAll(async () => {
    try {
      if (testBookIds.length > 0) {
        await Book.deleteMany({ _id: { $in: testBookIds } });
        testBookIds = [];
      }
    } catch (error) {
      console.error("Test DB Connection Failed:", error.message);
    }
  }, 15000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // ======================register user=================
  describe("User route", () => {
    test("should create a user with valid data", async () => {
      const res = await request(app).post("/api/users/register").send({
        name: "John Doe",
        email: uniqueEmail,
        password: "password123",
      });

      // Assertions
      expect(res.status).toBe(201);
      expect(res.body.user.id).toBeDefined();
      expect(res.body.user.name).toBe("John Doe");
      expect(res.body.user.email).toBe(uniqueEmail); // match the unique email
      expect(res.body.user.role).toBe("user");
    }, 15000); // increase timeout

    //=====================Loing user======================
    test("Loging user", async () => {
      const res = await request(app).post("/api/users/login").send({
        email: uniqueEmail,
        password: "password123",
      });

      // Capture cookie
      cookie = res.headers["set-cookie"][0];

      expect(res.status).toBe(200);
      expect(res.body.user.name).toBe("John Doe");
      expect(res.body.user.id).toBeDefined();
      expect(res.body.user.email).toBe(uniqueEmail);
      expect(res.body.user.role).toBe("user");
    });
  });

  describe("POST", () => {
    //================= POST Author ====================
    test("creat new author", async () => {
      const res = await request(app)
        .post("/authors")
        .set("Cookie", cookie)
        .send({
          name: newName,
          bio: "Colombian novelist and Nobel Prize winner",
          birthDate: "1927-03-06",
          nationality: "Colombian",
          genres: ["magical realism", "fiction"],
          books: ["64a1b2c3d4e5f6a7b8c9d0e1"],
        });

      authorId = res.body._id;

      expect(res.status).toBe(201);
      expect(res.body.name).toBe(newName);
      expect(res.body.bio).toBe("Colombian novelist and Nobel Prize winner");
      expect(res.body.nationality).toBe("Colombian");
    });

    //===================== POST book ======================
    test("should create new book", async () => {
      const res = await request(app)
        .post("/books")
        .set("Cookie", cookie)
        .send({
          title: newTitle,
          isbn: `2222-${timestamp}`,
          price: 15,
          stock: 10,
          author: "60f7c9b8e4d5f2a3b4c5d6e7",
        });

      bookId = res.body._id;

      expect(res.status).toBe(201);
      expect(res.body.title).toBe(newTitle);
      expect(res.body.isbn).toBe(`2222-${timestamp}`);
      expect(res.body.author).toBe("60f7c9b8e4d5f2a3b4c5d6e7");
    });

    //===================== POST order ======================
    test("should create new order", async () => {
      const res = await request(app)
        .post("/orders")
        .set("Cookie", cookie)
        .send({
          items: [
            {
              book: bookId,
              quantity: 2,
              price: 14.99,
            },
          ],
          totalAmount: 29.98,
          shippingAddress: "123 Main St, New York, NY 10001",
        });

      orderId = res.body.data._id;

      expect(res.status).toBe(201);
      expect(Array.isArray(res.body.data.items)).toBe(true);
      expect(res.body.data.items[0].book._id).toBe(bookId);
      expect(res.body.data.totalAmount).toBe(29.98);
    });
  });

  describe("all get route", () => {
    // ==================== GET ALL Authors ====================
    test("should get all Authors", async () => {
      const res = await request(app).get("/authors");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    // ==================== GET ALL BOOKS  ====================
    test("should get all books", async () => {
      const res = await request(app).get("/books");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("Get route by id", () => {
    // ==================== GET AUTHOR ID====================
    test("should get Author by id", async () => {
      const res = await request(app).get(`/authors/${authorId}`).set("Cookie", cookie);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe(newName);
      expect(res.body.nationality).toBe("Colombian");
    });

    // ==================== GET BOOKS By ID ====================
    test("should get Book by id", async () => {
      const res = await request(app).get(`/books/${bookId}`).set("Cookie", cookie);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe(newTitle);
    });

    // ==================== GET Order By ID ====================
    test("should get oreder by id", async () => {
      const res = await request(app).get(`/orders/${orderId}`).set("Cookie", cookie);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data[0].totalAmount).toBe(29.98);
    });

    // ==================== GET Order By ID ====================
    test("should get user", async () => {
      const res = await request(app).get(`/api/users/me`).set("Cookie", cookie);

      expect(res.status).toBe(200);
      expect(res.body.user.email).toBe(uniqueEmail);
    });
  });
});
