const mongoose = require("mongoose");
const Appointment = require("../appointment-models/appointment");
const QuizReport = require("../health-models/quizReport");
const QuizDiagnosis = require("../health-models/quizDiagnosis");
const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: [1, "Age must be a positive number"],
    },
    breed: { type: mongoose.Schema.Types.ObjectId, ref: "Breed" },
    color: { type: mongoose.Schema.Types.ObjectId, ref: "Color" },
    type: {
      type: String,
      enum: ["cat"],
      required: true,
    },
    vaccinated: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    photoUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

petSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const appointmentsDeleted = await Appointment.deleteMany({
        pet: this._id,
      });
      const quizReports = await QuizReport.find({ pet: this._id });
      const quizReportIds = quizReports.map((report) => report._id);

      const quizDiagnosesDeleted = await QuizDiagnosis.deleteMany({
        quizReport: { $in: quizReportIds },
      });
      const quizReportsDeleted = await QuizReport.deleteMany({ pet: this._id });
      next();
    } catch (err) {
      next(err);
    }
  }
);
module.exports = mongoose.model("Pet", petSchema);
