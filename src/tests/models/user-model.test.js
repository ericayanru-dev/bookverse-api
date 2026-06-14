const mongoose = require("mongoose");
const User = require("../../models/user");
require("dotenv").config();

describe("User model", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      await User.deleteOne({ email: "john@example.com" });
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      throw error;
    }
  }, 60000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should create a user with valid data", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      role: "user",
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBeDefined();
    expect(savedUser.role).toBe(userData.role);
  });

  test("should not allow duplicate email", async () => {
    const userData = {
      name: "Jane Doe",
      email: "john@example.com", // same email
      password: "password123",
      role: "user",
    };

    await expect(new User(userData).save()).rejects.toThrow();
  });
});
