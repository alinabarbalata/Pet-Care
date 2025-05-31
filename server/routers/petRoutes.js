const express = require("express");
const petRouter = express.Router();
const {
  createAppointment,
  updateAppointment,
  getAllAppointmentsForPet,
  deleteAppointment,
  changeAppointmentStatus,
  getAllAppointments,
  getOneAppointment,
} = require("../routers/controllers/appointment-controller/appointmentController");

const {
  createPet,
  updatePet,
  deletePet,
  getAllPets,
  getOnePet,
} = require("../routers/controllers/pet-controller/petController");
const {
  createQuizReport,
  getAllQuizReports,
  getAllQuizReportsForPet,
} = require("./controllers/health-controller/quizController");
const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");

petRouter.post("/pets", verifyToken, authorizeRole("owner"), createPet);
petRouter.put("/pets/:pid", verifyToken, authorizeRole("owner"), updatePet);
petRouter.get(
  "/pets",
  verifyToken,
  authorizeRole("owner", "admin"),
  getAllPets
);
petRouter.get(
  "/pets/:pid",
  verifyToken,
  authorizeRole("owner", "admin", "vet"),
  getOnePet
);

petRouter.delete(
  "/pets/:pid",
  verifyToken,
  authorizeRole("owner", "admin"),
  deletePet
);

//appointment routes
petRouter.post(
  "/pets/:pid/appointments",
  verifyToken,
  authorizeRole("owner"),
  createAppointment
);
petRouter.put(
  "/pets/:pid/appointments/:aid",
  verifyToken,
  authorizeRole("owner"),
  updateAppointment
);
petRouter.get(
  "/pets/:pid/appointments",
  verifyToken,
  authorizeRole("owner", "vet", "admin"),
  getAllAppointmentsForPet
);
petRouter.delete(
  "/pets/:pid/appointments/:aid",
  verifyToken,
  authorizeRole("admin"),
  deleteAppointment
);
petRouter.patch(
  "/pets/:pid/appointments/:aid/status",
  verifyToken,
  authorizeRole("owner", "vet", "admin"),
  changeAppointmentStatus
);
petRouter.get(
  "/appointments",
  verifyToken,
  authorizeRole("admin", "vet", "owner"),
  getAllAppointments
);
petRouter.get(
  "/pets/:pid/appointments/:aid",
  verifyToken,
  authorizeRole("vet", "owner", "admin"),
  getOneAppointment
);
petRouter.post(
  "/quiz-report",
  verifyToken,
  authorizeRole("owner"),
  createQuizReport
);
petRouter.get(
  "/quiz-report",
  verifyToken,
  authorizeRole("owner", "admin"),
  getAllQuizReports
);
petRouter.get(
  "/quiz-report/:pid",
  verifyToken,
  authorizeRole("owner", "admin", "vet"),
  getAllQuizReportsForPet
);
module.exports = petRouter;
