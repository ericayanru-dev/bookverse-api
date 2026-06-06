const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

const app = express();

// Security & Logging
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
const booksRoutes = require("./routes/books.routes");
app.use("/books", booksRoutes);

const authorsRoutes = require("./routes/authors.routes");
app.use("/api/authors", authorsRoutes);

app.use("/api/authors", (req, res) => {
  res.send({ message: "Authors endpoint" });
});
app.use("/api/orders", (req, res) => {
  res.send({ message: "Orders endpoint" });
});

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
