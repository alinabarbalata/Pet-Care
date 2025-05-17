const mongoose = require("mongoose");

const breedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["cat"],
    required: true,
  },
});

module.exports = mongoose.model("Breed", breedSchema);
