const express = require("express");
const adminRouter = express.Router();
const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");
const {
  createBreed,
  getAllBreeds,
  deleteBreed,
  updateBreed,
} = require("../routers/controllers/pet-controller/breedController");
const {
  createColor,
  updateColor,
  getAllColors,
  deleteColor,
} = require("./controllers/pet-controller/colorController");
const {
  createStatus,
  updateStatus,
  getAllStatuses,
  deleteStatus,
} = require("./controllers/appointment-controller/appointmentStatusController");
const {
  createSymptom,
  updateSymptom,
  getAllSymptoms,
  deleteSymptom,
} = require("./controllers/health-controller/healthQuizController");
//pet-breed CRUD
adminRouter.post("/breeds", verifyToken, authorizeRole("admin"), createBreed);
adminRouter.post(
  "/breeds/:bid",
  verifyToken,
  authorizeRole("admin"),
  updateBreed
);
adminRouter.get(
  "/breeds",
  verifyToken,
  authorizeRole("admin", "owner"),
  getAllBreeds
);
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
adminRouter.get(
  "/colors",
  verifyToken,
  authorizeRole("admin", "owner"),
  getAllColors
);
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
  authorizeRole("admin", "vet", "owner"),
  getAllStatuses
);
adminRouter.delete(
  "/statuses/:sid",
  verifyToken,
  authorizeRole("admin"),
  deleteStatus
);

//disease-symptom CRUD
adminRouter.post(
  "/symptoms",
  verifyToken,
  authorizeRole("admin"),
  createSymptom
);
adminRouter.post(
  "/symptoms/:sid",
  verifyToken,
  authorizeRole("admin"),
  updateSymptom
);
adminRouter.get(
  "/symptoms",
  verifyToken,
  authorizeRole("admin", "vet", "owner"),
  getAllSymptoms
);
adminRouter.delete(
  "/symptoms/:sid",
  verifyToken,
  authorizeRole("admin"),
  deleteSymptom
);
module.exports = adminRouter;
