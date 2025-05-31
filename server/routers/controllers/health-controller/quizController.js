const QuizDiagnosis = require("../../../models/health-models/quizDiagnosis");
const QuizReport = require("../../../models/health-models/quizReport");
const Pet = require("../../../models/pet-models/pet");
const computeDiagnosis = require("../utils/computeDiagnosis");

const createQuizReport = async (req, res) => {
  try {
    const { petId, checkedSymptoms } = req.body;

    const newQuizReport = new QuizReport({ pet: petId });

    await newQuizReport.save();

    const diagnoses = await computeDiagnosis(
      newQuizReport._id,
      checkedSymptoms
    );

    const savedDiagnoses = await Promise.all(
      diagnoses.map(async (diagnosisData) => {
        const diagnosis = new QuizDiagnosis(diagnosisData);
        await diagnosis.save();
        return diagnosis._id;
      })
    );

    newQuizReport.possibleDiseases = savedDiagnoses;
    await newQuizReport.save();

    const populatedReport = await QuizReport.findById(newQuizReport._id)
      .populate({
        path: "pet",
        populate: [{ path: "breed" }, { path: "color" }, { path: "owner" }],
      })
      .populate({
        path: "possibleDiseases",
        populate: {
          path: "disease",
          populate: { path: "symptoms" },
        },
      });
    res.status(201).json({
      message: "Quiz result created successfully",
      quizReport: populatedReport,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating quiz report",
      error: error.message,
    });
  }
};

const getAllQuizReports = async (req, res) => {
  let reports = [];
  try {
    if (req.user.role === "admin") {
      reports = await QuizReport.find()
        .populate({
          path: "pet",
          populate: [{ path: "breed" }, { path: "color" }, { path: "owner" }],
        })
        .populate({
          path: "possibleDiseases",
          populate: {
            path: "disease",
            populate: { path: "symptoms" },
          },
        });
    } else if (req.user.role === "owner") {
      const ownerPets = await Pet.find({ owner: req.user._id }, "_id");
      const petIds = ownerPets.map((pet) => pet._id);
      reports = await QuizReport.find({ pet: { $in: petIds } })
        .populate({
          path: "pet",
          populate: [{ path: "breed" }, { path: "color" }, { path: "owner" }],
        })
        .populate({
          path: "possibleDiseases",
          populate: {
            path: "disease",
            populate: { path: "symptoms" },
          },
        });
    }

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching quiz reports",
      error: error.message,
    });
  }
};
const getAllQuizReportsForPet = async (req, res) => {
  const { pid } = req.params;
  try {
    const reports = await QuizReport.find({ pet: pid })
      .populate({
        path: "pet",
        populate: [{ path: "breed" }, { path: "color" }, { path: "owner" }],
      })
      .populate({
        path: "possibleDiseases",
        populate: {
          path: "disease",
          populate: { path: "symptoms" },
        },
      });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching quiz reports",
      error: error.message,
    });
  }
};

module.exports = {
  createQuizReport,
  getAllQuizReports,
  getAllQuizReportsForPet,
};
