const mongoose = require("mongoose");

const quizReportchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  possibleDiseases: [
    { type: mongoose.Schema.Types.ObjectId, ref: "QuizDiagnosis" },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QuizReport", quizReportchema);
