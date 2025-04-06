const express = require("express");
const petRouter = express.Router();
const {
  createPet,
  updatePet,
  getAllPets,
  deletePet,
} = require("../routers/controllers/petController");
const verifyToken = require("../middleware/authMiddleware");

petRouter.post("/pets", verifyToken, createPet);
petRouter.put("/pets/:pid", verifyToken, updatePet);
petRouter.get("/pets", verifyToken, getAllPets);
petRouter.delete("/pets/:pid", verifyToken, deletePet);

module.exports = petRouter;
