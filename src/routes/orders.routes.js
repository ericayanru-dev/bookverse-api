const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");

const {
  getOrdersValidation,
  createOrderValidation,
  deleteOrderValidation,
} = require("../middleware/validation/orders-validations");

const { getOrders, createOrder, deleteOrder } = require("../controllers/order-controllers");

// GET /api/orders
router.get("/:id", verifyToken, getOrdersValidation(), getOrders);

// POST /api/orders
router.post("/", verifyToken, createOrderValidation(), createOrder);

// DELETE /api/orders/:id
router.delete("/:id", verifyToken, deleteOrderValidation(), deleteOrder);

module.exports = router;
