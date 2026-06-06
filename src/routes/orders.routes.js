const express = require("express");
const router = express.Router();
const { getOrders, createOrder, deleteOrder } = require("../controllers/order-controllers");

// GET /api/orders
router.get("/", getOrders);

// POST /api/orders
router.post("/", createOrder);

// DELETE /api/orders/:id
router.delete("/:id", deleteOrder);

module.exports = router;
