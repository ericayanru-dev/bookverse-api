const express = require("express");
const { verifyToken } = require("../middleware/auth");
const {
  registerValidation,
  loginValidation,
  updateUserRules,
} = require("../middleware/validation/user-validations");
const { register, login, logout, getMe } = require("../controllers/authController");
const { updateUser, deleteUser } = require("../controllers/users-controllers");

const router = express.Router();

router.post("/register", registerValidation(), register);
router.post("/login", loginValidation(), login);
router.post("/logout", verifyToken, logout);
router.get("/me", verifyToken, getMe);
router.put("/:id", verifyToken, updateUserRules, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
