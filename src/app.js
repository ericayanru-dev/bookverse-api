const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require("cookie-parser");

const swaggerDocument = require("./swagger/swagger.json");
const booksRoutes = require("./routes/books.routes");
const authorsRoutes = require("./routes/authors.routes");
const authRouter = require('./routes/auth-routes');
const passport = require('./config/passport');
const { verifyToken, requireAdmin } = require('./middleware/auth');
const connectDB = require("./config/db-connect");


const app = express();
app.enable("trust proxy"); // Enable if behind a proxy (e.g., Heroku, Nginx)

// Security & Logging
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(passport.initialize()); // stateless

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});



// Private API
//
//    verifyToken is used for all routes
//    requireAdmin is used as a second guard for
//      any admin only endpoints (eg. /api/orders)
//
// Other endpoints aren't implemented for now,
//  this skips verification if in-dev for those endpoints.
//  We just add verifyToken & requireAdmin accordingly if


// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
=======
// API Routes
app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);


module.exports = app;
