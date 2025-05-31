const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  symptoms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Symptom" }],
  severity: { type: String },
});

module.exports = mongoose.model("Disease", diseaseSchema);
