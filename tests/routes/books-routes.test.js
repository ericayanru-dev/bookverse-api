const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

const app = require("../../src/app");
const Book = require("../../src/models/book");
let testBookIds = [];
const timestamp = Date.now();

//========unit email for register and loging==============
const uniqueEmail = `john-${timestamp}@example.com`;

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

    expect(res.status).toBe(200);
    expect(res.body.user.name).toBe("John Doe");
    expect(res.body.user.id).toBeDefined();
    expect(res.body.user.email).toBe(uniqueEmail);
    expect(res.body.user.role).toBe("user");
  });

  // ==================== GET ALL BOOKS ====================
  test("should get all books", async () => {
    const res = await request(app).get("/books");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
