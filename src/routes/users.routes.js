const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { register, login, logout, getMe } = require("../controllers/authController");
const { updateUser, deleteUser } = require("../controllers/users-controllers");
const { validateRegister, validateLogin, validateUpdateUser } = require("../middleware/validation/user-validations");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", validateUpdateUser, logout);
router.get("/me", verifyToken, getMe);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
