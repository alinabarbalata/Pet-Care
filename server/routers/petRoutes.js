const express = require("express");
const petRouter = express.Router();
const {
  createPet,
  updatePet,
  getAllPets,
  deletePet,
} = require("../routers/controllers/petController");
const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");

petRouter.post("/pets", verifyToken, authorizeRole("owner"), createPet);
petRouter.put("/pets/:pid", verifyToken, authorizeRole("owner"), updatePet);
petRouter.get(
  "/pets",
  verifyToken,
  authorizeRole("owner", "admin"),
  getAllPets
);
petRouter.delete("/pets/:pid", verifyToken, authorizeRole("owner"), deletePet);

module.exports = petRouter;
