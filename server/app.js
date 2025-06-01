const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const authRouter = require("./routers/authRoutes");
const petRouter = require("./routers/petRoutes");
const adminRouter = require("./routers/adminRoutes");

dotenv.config();

const app = express();

console.log("Server is starting...");
console.log("Path to client:", path.join(__dirname, "../client"));

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/auth", authRouter);
app.use("/api", petRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
