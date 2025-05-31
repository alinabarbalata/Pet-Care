const Symptom = require("../../../models/health-models/symptom");
const Disease = require("../../../models/health-models/disease");

const createSymptom = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    const newSymptom = new Symptom({
      name,
      description,
      category,
    });
    await newSymptom.save();
    res
      .status(201)
      .json({ message: "Symptom created successfully", symptom: newSymptom });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating symptom", error: error.message });
  }
};
const updateSymptom = async (req, res) => {
  try {
    const symptom = await Symptom.findById(req.params.sid);
    if (!symptom) {
      return res.status(404).json({ message: "Symptom not found" });
    }

    symptom.set(req.body);

    await symptom.save();

    res.status(200).json({ message: "Symptom updated successfully", symptom });
  } catch (error) {
    res.status(500).json({ message: "Error updating symptom", error });
  }
};
const getAllSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find({});
    if (symptoms.length === 0) {
      return res.status(404).json({ message: "No symptoms found" });
    }
    res
      .status(200)
      .json({ message: "Symptoms retrieved successfully", symptoms });
  } catch (error) {
    res.status(500).json({ message: "Error fetching symptoms", error });
  }
};

const deleteSymptom = async (req, res) => {
  try {
    const symptom = await Symptom.findById(req.params.sid);
    if (!symptom) {
      return res.status(404).json({ message: "Symptom not found" });
    }
    await Symptom.findByIdAndDelete(req.params.sid);
    res.status(200).json({ message: "Symptom deleted successfully", symptom });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting symptom",
      error: error.message || error,
    });
  }
};

const createDisease = async (req, res) => {
  try {
    const { name, description, symptoms, severity } = req.body;

    const newDisease = new Disease({
      name,
      description,
      symptoms,
      severity,
    });
    await newDisease.save();
    res.status(200).json({ message: "Disease added successfully", newDisease });
  } catch (error) {
    res.status(500).json({
      message: "Error creating disease",
      error: error.message || error,
    });
  }
};

const updateDisease = async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.did);
    if (!disease) {
      return res.status(404).json({ message: "Disease not found" });
    }

    disease.set(req.body);

    await disease.save();

    res.status(200).json({ message: "Disease updated successfully", disease });
  } catch (error) {
    res.status(500).json({ message: "Error updating disease", error });
  }
};
const getAllDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find({}).populate("symptoms");
    if (diseases.length === 0) {
      return res.status(404).json({ message: "No diseases found" });
    }
    res
      .status(200)
      .json({ message: "Diseases retrieved successfully", diseases });
  } catch (error) {
    res.status(500).json({ message: "Error fetching diseases", error });
  }
};

const deleteDisease = async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.did);
    if (!disease) {
      return res.status(404).json({ message: "Disease not found" });
    }
    await Disease.findByIdAndDelete(req.params.did);
    res.status(200).json({ message: "Disease deleted successfully", disease });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting symptom",
      error,
    });
  }
};
module.exports = {
  createSymptom,
  updateSymptom,
  getAllSymptoms,
  deleteSymptom,
  createDisease,
  updateDisease,
  getAllDiseases,
  deleteDisease,
};
