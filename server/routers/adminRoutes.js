const express = require("express");
const adminRouter = express.Router();
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

adminRouter.post("/breeds", createBreed);
adminRouter.post("/breeds/:bid", updateBreed);
adminRouter.get("/breeds", getAllBreeds);
adminRouter.delete("/breeds/:bid", deleteBreed);

adminRouter.post("/colors", createColor);
adminRouter.post("/colors/:cid", updateColor);
adminRouter.get("/colors", getAllColors);
adminRouter.delete("/colors/:cid", deleteColor);

module.exports = adminRouter;
