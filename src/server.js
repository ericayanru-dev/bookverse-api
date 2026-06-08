require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db-connect");

// Connect to MongoDB
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`BookVerse API running on port ${PORT}`);
      console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
