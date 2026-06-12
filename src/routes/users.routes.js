const express = require("express");
const { verifyToken } = require("../middleware/auth");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validation/user-validations");
const {
  register,
  login,
  logout,
  getMe,
  updateUser,
  deleteUser,
} = require("../controllers/users-controllers");

const router = express.Router();

router.post("/register", registerValidation(), register);
router.post("/login", loginValidation(), login);
router.post("/logout", logout);
router.get("/me", verifyToken, getMe);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
