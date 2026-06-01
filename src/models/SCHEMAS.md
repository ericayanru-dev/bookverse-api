# BookVerse API - Database Schemas Documentation

This document describes all Mongoose schemas used in the BookVerse API.


---

## 1. User Schema (`src/models/User.js`)

**Purpose**: Stores user information including both traditional and OAuth logins.

### Fields:

| Field              | Type      | Required | Description |
|--------------------|-----------|----------|-----------|
| `name`             | String    | Yes      | Full name of the user |
| `email`            | String    | Yes      | Unique email address |
| `password`         | String    | No       | Require, Validate and Hashed password (only for local accounts) |
| `oauthProvider`    | String    | No       | `local`, `google`, or `auth0` |
| `oauthId`          | String    | No       | Provider-specific user ID (e.g., Google ID) |
| `role`             | String    | No       | `user` or `admin` (default: `user`) |
| `avatar`           | String    | No       | Profile picture URL |
| `shippingAddress`  | Object    | No       | User's shipping address |
| `phone`            | String    | No       | Contact number |
| `isVerified`       | Boolean   | No       | Email/OAuth verification status |
| `lastLogin`        | Date      | No       | Last login timestamp |
| `createdAt`        | Date      | Auto     | Account creation date |

**Indexes**: Compound index on `(oauthProvider, oauthId)`

---

## 2. Book Schema (`src/models/Book.js`)

**Purpose**: Represents books available in the store.

### Fields:

| Field             | Type     | Required | Description |
|-------------------|----------|----------|-----------|
| `title`           | String   | Yes      | Book title |
| `isbn`            | String   | Yes      | Unique ISBN number |
| `description`     | String   | No       | Book summary |
| `price`           | Number   | Yes      | Current price |
| `stock`           | Number   | Yes      | Available quantity |
| `genre`           | String   | No       | Literary genre |
| `author`          | ObjectId | Yes      | Reference to Author |
| `publishedYear`   | Number   | No       | Year of publication |
| `coverImage`      | String   | No       | Book cover image URL |
| `createdAt`       | Date     | Auto     | Added to catalog date |

---

## 3. Author Schema (`src/models/Author.js`)

**Purpose**: Stores author information and their books.

### Fields:

| Field          | Type     | Required | Description |
|----------------|----------|----------|-----------|
| `name`         | String   | Yes      | Author's full name |
| `bio`          | String   | No       | Biography |
| `birthDate`    | Date     | No       | Date of birth |
| `nationality`  | String   | No       | Country of origin |
| `genres`       | Array    | No       | List of genres |
| `books`        | Array    | No       | References to Book documents |
| `createdAt`    | Date     | Auto     | Record creation date |

---

## 4. Order Schema (`src/models/Order.js`)

**Purpose**: Records customer purchases.

### Fields:

| Field              | Type     | Required | Description |
|--------------------|----------|----------|-----------|
| `user`             | ObjectId | Yes      | Reference to User |
| `items`            | Array    | Yes      | List of books purchased |
| `items.book`       | ObjectId | Yes      | Reference to Book |
| `items.quantity`   | Number   | Yes      | Quantity ordered |
| `items.price`      | Number   | Yes      | Price at time of purchase |
| `totalAmount`      | Number   | Yes      | Total order value |
| `status`           | String   | No       | `pending`, `processing`, `shipped`, `delivered`, `cancelled` |
| `shippingAddress`  | Object   | No       | Delivery address |
| `createdAt`        | Date     | Auto     | Order placement date |

---

## Relationships Summary

- **User → Order**: One-to-Many
- **Author → Book**: One-to-Many
- **Book → Order**: Many-to-Many (through Order.items)
- **User → Book**: Many-to-Many (through orders)

---

## Best Practices

- Use transactions for order creation (to prevent overselling)
- Hash passwords before saving (using `bcryptjs`)
- Validate OAuth users properly

---

**Last Updated**: June 2026  
**Maintained by**: DevOps & Project Core Track