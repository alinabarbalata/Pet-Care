const Disease = require("../../../models/health-models/disease");

const computeDiagnosis = async (quizReportId = null, checkedSymptoms) => {
  const diseases = await Disease.find({}).populate("symptoms");
  const diagnosisResults = [];

  for (const disease of diseases) {
    const symptomIds = disease.symptoms.map((symptom) =>
      symptom._id.toString()
    );

    const matchedSymptomsCount = symptomIds.filter((id) =>
      checkedSymptoms.includes(id)
    ).length;
    const totalSymptoms = symptomIds.length;

    const likelihood =
      totalSymptoms > 0 ? (matchedSymptomsCount / totalSymptoms) * 100 : 0;

    if (likelihood > 50) {
      diagnosisResults.push({
        quizReport: quizReportId,
        disease: disease._id,
        matchedSymptoms: matchedSymptomsCount,
        totalSymptoms: totalSymptoms,
        likelihood: Math.round(likelihood * 100) / 100,
      });
    }
  }

  const topDiagnoses = diagnosisResults
    .sort((a, b) => b.likelihood - a.likelihood)
    .slice(0, 3);

  return topDiagnoses;
};

module.exports = computeDiagnosis;
