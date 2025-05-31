const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  category: { type: String },
});

module.exports = mongoose.model("Symptom", symptomSchema);
