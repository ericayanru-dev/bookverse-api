# BookVerse API

Backend API for an online bookstore built with Node.js, Express, and MongoDB.

**Course**: CSE 341 - Final Project  
**Team**: 13 Members

---

## Overview

The BookVerse API is a RESTful backend that manages books, authors, users, and orders for an online bookstore. It includes authentication, role-based access control, and comprehensive CRUD operations.

---

## Features

- User authentication with JWT + Google OAuth support
- Complete CRUD operations for Books and Authors
- Order management system
- Role-based access (User & Admin)
- Secure API with Helmet, CORS, and rate limiting
- Interactive API documentation with Swagger
- MongoDB Atlas cloud database

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas + Mongoose
- **Authentication**: JWT + bcrypt
- **Documentation**: Swagger UI
- **Security**: Helmet, express-validator, rate-limiter
- **Logging**: Morgan

---

## Project Structure

```bash
src/
├── config/           # Database connection & environment config
├── controllers/      # Route handlers
├── middleware/       # Auth, validation, error handling
├── models/           # Mongoose schemas
├── routes/           # API route definitions
├── services/         # Business logic
├── validators/       # Input validation
├── utils/            # Helper functions
├── swagger/          # OpenAPI documentation
├── tests/            # Test files
├── app.js            # Express app configuration
└── server.js         # Server entry point
```


## Setup Instructions

1. # Clone the Repository
git clone https://github.com/YOURUSERNAME/bookverse-api.git
cd bookverse-api
git checkout develop

2. # Install Dependencies
npm install

3. # Environment Variables
cp .env.example .env

Then fill in your .env file:

envPORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_very_long_secret_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000

4. Run the Application
# Development
npm run dev

# Production
npm start

# formating
npm lint 

# Available Scripts
JSON"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "lint": "eslint src/ --fix",
  "test": "jest"
  "swagger": "src/swagger.js"
}

# API Documentation
Once the server is running, visit:
http://localhost:5000/api-docs

Branch Strategy

main → Production-ready (protected)
develop → Integration branch (protected)
`feature/*` → New features
`bugfix/*` → Bug fixes
`chore/*` → Maintenance & setup

See CONTRIBUTING.md for full details. eric