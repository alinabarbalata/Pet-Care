const express = require("express");
const {
  register,
  login,
  getAllVets,
} = require("./controllers/user-controller/userController");
const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get(
  "/vets",
  verifyToken,
  authorizeRole("owner", "admin"),
  getAllVets
);
module.exports = authRouter;
