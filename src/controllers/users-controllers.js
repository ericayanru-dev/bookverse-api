const User = require("../models/user");

const updateUser = async (req, res) => {
  try {
    const { name, email, phone, avatar, shippingAddress } = req.body;

    const body = {};
    if (name) body.name = name.trim();
    if (email) body.email = email.toLowerCase().trim();
    if (phone) body.phone = phone.trim();
    if (avatar) body.avatar = avatar.trim();
    if (shippingAddress) body.shippingAddress = shippingAddress;

    const user = await User.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateUser, deleteUser };
