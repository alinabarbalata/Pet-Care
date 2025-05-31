const mongoose = require("mongoose");

const quizDiagnosisSchema = new mongoose.Schema({
  quizReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizResult",
    required: true,
  },
  disease: { type: mongoose.Schema.Types.ObjectId, ref: "Disease" },
  likelihood: Number,
  matchedSymptoms: Number,
  totalSymptoms: Number,
});

module.exports = mongoose.model("QuizDiagnosis", quizDiagnosisSchema);
