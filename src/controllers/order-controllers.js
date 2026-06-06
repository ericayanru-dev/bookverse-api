/**
 * @file order-controllers.js
 * @description Controllers for handling Orders business logic.
 * Assigned to: Lawrence Okon
 */

const Order = require("../models/order");
const User = require("../models/user");
const Book = require("../models/book");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate({ path: "items.book", select: "title price" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch orders.",
      error: error.message,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { user, items, totalAmount, shippingAddress, status } = req.body;

    // Check if items array is missing or empty
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot place an empty order. Please add at least one book.",
      });
    }

    const fallbackUser = req.user ? req.user.id : user || "65f1a2b3c4d5e6f7a8b9c0d9";
    const cleanStatus = status ? status.toLowerCase() : "pending";

    // Create document in database matching the nested object requirements
    const newOrder = await Order.create({
      user: fallbackUser,
      items,
      totalAmount,
      shippingAddress, 
      status: cleanStatus,
    });

    // Populate references for output display
    const populatedOrder = await Order.findById(newOrder._id)
      .populate("user", "name email")
      .populate({ path: "items.book", select: "title price" });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: populatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error: Failed to place order.",
      error: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order with ID ${orderId} not found.`,
      });
    }

    await Order.findByIdAndDelete(orderId);

    return res.status(200).json({
      success: true,
      message: "Order successfully cancelled and deleted.",
      data: { id: orderId },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error: Failed to delete order.",
      error: error.message,
    });
  }
};

module.exports = { getOrders, createOrder, deleteOrder };
