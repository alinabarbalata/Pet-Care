import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
const HealthReportView = ({ report }) => {
  const [quizDiagnoses, setQuizDiagnoses] = useState([]);
  useEffect(() => {
    if (report?.possibleDiseases) {
      console.log(report.possibleDiseases);
      setQuizDiagnoses(report.possibleDiseases);
    }
  }, []);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          pb: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            mb: 1,
            ml: 5,
            fontWeight: "bold",
            color: "green",
            fontFamily: "'Times New Roman', Times, serif",
          }}
        >
          Report for {report.pet?.name}
        </Typography>
        {quizDiagnoses.length === 0 && (
          <Typography sx={{ mb: 2, ml: 5 }}>
            No diagnoses found for this report.
          </Typography>
        )}
        {quizDiagnoses.map((diagnosis) => (
          <ListItem
            key={diagnosis._id}
            alignItems="flex-start"
            sx={{ display: "block" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 0.5,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontWeight: "bold",
                  ml: 3,
                }}
              >
                {" "}
                {diagnosis.disease?.name || ""}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: "italic", fontSize: "0.95rem" }}
              >
                — {diagnosis.disease?.description || ""}
              </Typography>
            </Box>

            <ListItemText
              sx={{ fontFamily: "'Times New Roman', Times, serif", ml: 5 }}
              primary={"Likelihood: " + diagnosis.likelihood + "%"}
              secondary={
                "Matched Symptoms: " +
                diagnosis.matchedSymptoms +
                "/" +
                diagnosis.totalSymptoms
              }
            />
          </ListItem>
        ))}
        <Typography
          variant="h7"
          sx={{
            fontFamily: "'Times New Roman', Times, serif",
            ml: 3,
          }}
        >
          Date: {report.date}
        </Typography>

        <Divider
          sx={{
            mt: 2,
            borderColor: "grey.400",
            borderBottomWidth: 1,
            width: "100%",
          }}
        />
      </Box>
    </>
  );
};

export default HealthReportView;
