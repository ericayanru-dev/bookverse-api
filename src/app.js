const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

// Auth dependencies
const passport = require('./config/passport');
const authRouter = require('./routes/auth');
const cookieParser = require("cookie-parser");
const { verifyToken, requireAdmin } = require('./middleware/auth');

const app = express();

// Security & Logging
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(passport.initialize()); // stateless

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});


////////////////////////////////////////
// Public API
//
//    Auth Routes
////////////////////////////////////////
app.use("/api/auth", authRouter);


////////////////////////////////////////
// Private API
//
//    verifyToken is used for all routes
//    requireAdmin is used as a second guard for
//      any admin only endpoints (eg. /api/orders)
//
// Other endpoints aren't implemented for now,
//  this skips verification if in-dev for those endpoints.
//  We just add verifyToken & requireAdmin accordingly if
//  we wish to remove this function later.
const productionOnly = (...authMiddleware) => process.env.NODE_ENV === 'production' ? authMiddleware : [];
////////////////////////////////////////

// API Routes (to be added later)
app.use("/api/books", ...productionOnly(verifyToken), (req, res) => {
  res.send({ message: "Books endpoint" });
});
app.use("/api/authors", ...productionOnly(verifyToken), (req, res) => {
// API Routes
const booksRoutes = require("./routes/books.routes");
app.use("/books", booksRoutes);
app.use("/api/authors", (req, res) => {
  res.send({ message: "Authors endpoint" });
});
// Orders require both: login and admin role.
app.use("/api/orders", ...productionOnly(verifyToken, requireAdmin), (req, res) => {
  res.send({ message: "Orders endpoint" });
});

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
