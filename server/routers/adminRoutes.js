const express = require("express");
const adminRouter = express.Router();
const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");
const {
  createBreed,
  getAllBreeds,
  deleteBreed,
  updateBreed,
} = require("../routers/controllers/breedController");
const {
  createColor,
  updateColor,
  getAllColors,
  deleteColor,
} = require("./controllers/colorController");

const {
  createStatus,
  updateStatus,
  getAllStatuses,
  deleteStatus,
} = require("./controllers/appointmentStatusController");

//pet-breed CRUD
adminRouter.post("/breeds", verifyToken, authorizeRole("admin"), createBreed);
adminRouter.post(
  "/breeds/:bid",
  verifyToken,
  authorizeRole("admin"),
  updateBreed
);
adminRouter.get("/breeds", verifyToken, authorizeRole("admin"), getAllBreeds);
adminRouter.delete(
  "/breeds/:bid",
  verifyToken,
  authorizeRole("admin"),
  deleteBreed
);

//pet-color CRUD
adminRouter.post("/colors", verifyToken, authorizeRole("admin"), createColor);
adminRouter.post(
  "/colors/:cid",
  verifyToken,
  authorizeRole("admin"),
  updateColor
);
adminRouter.get("/colors", verifyToken, authorizeRole("admin"), getAllColors);
adminRouter.delete(
  "/colors/:cid",
  verifyToken,
  authorizeRole("admin"),
  deleteColor
);

//appointment-status CRUD
adminRouter.post(
  "/statuses",
  verifyToken,
  authorizeRole("admin"),
  createStatus
);
adminRouter.post(
  "/statuses/:sid",
  verifyToken,
  authorizeRole("admin"),
  updateStatus
);
adminRouter.get(
  "/statuses",
  verifyToken,
  authorizeRole("admin"),
  getAllStatuses
);
adminRouter.delete(
  "/statuses/:sid",
  verifyToken,
  authorizeRole("admin"),
  deleteStatus
);

module.exports = adminRouter;
