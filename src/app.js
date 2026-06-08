const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

const booksRoutes = require("./routes/books.routes");
const authorsRoutes = require("./routes/authors.routes");
const ordersRoutes = require("./routes/orders.routes");

const app = express();
app.enable("trust proxy"); // Enable if behind a proxy (e.g., Heroku, Nginx)

// Security & Logging
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);
app.use("/orders", ordersRoutes);

module.exports = app;
