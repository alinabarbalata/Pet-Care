const bcrypt = require("bcrypt");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const passwordHashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: passwordHashed, role });
    await user.save();

    res.status(201).json({ message: "User created succesfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user!", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res
        .status(200)
        .json({ message: "Login successful", email, token, role: user.role });
    }
    return res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllVets = async (req, res) => {
  try {
    if (req.user.role === "admin" || req.user.role === "owner") {
      const vets = await User.find({ role: "vet" });
      res.status(200).json({ message: "Vets retrieved successfully", vets });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching vets", error });
  }
};

module.exports = { register, login, getAllVets };
