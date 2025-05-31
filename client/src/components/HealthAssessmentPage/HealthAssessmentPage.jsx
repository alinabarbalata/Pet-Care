import react, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Box, Button, Typography, Divider } from "@mui/material";
import HealthReportView from "../HealthReportView/HealthReportView";
import AppContext from "../../state/AppContext";
import CatStandingGreen from "../../assets/animations/cat-standing-green.json";
import Lottie from "lottie-react";
const HealthAssessmentPage = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const globalState = useContext(AppContext);
  const handleTakeQuiz = () => {
    navigate("quiz");
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await globalState.health.getAllQuizReports();
        console.log("reports: ", response);
        setReports(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReports();
  }, []);
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mt: 4,
          px: 3,
          mb: 7,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "950",
            color: "success.dark",
            fontFamily: `"Times New Roman", Times, serif`,
            textAlign: "start",
          }}
        >
          Health Monitoring Page
        </Typography>
        <Button
          variant="contained"
          onClick={handleTakeQuiz}
          sx={{ borderRadius: "30px", backgroundColor: "green" }}
        >
          Take Health Quiz
        </Button>
      </Stack>
      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 200,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        <Lottie animationData={CatStandingGreen} loop />
      </Box>
      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          width: "95%",
          borderRadius: 2,
          mx: "auto",
          boxShadow: `
    0 -4px 6px -4px rgba(0, 0, 0, 0.2),
    0 4px 6px -4px rgba(0, 0, 0, 0.2),
    -4px 0 6px -4px rgba(0, 0, 0, 0.15),
    4px 0 6px -4px rgba(0, 0, 0, 0.15)
  `,
        }}
      >
        {reports.map((report) => (
          <HealthReportView key={report._id} report={report} />
        ))}
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: "auto",
          pr: 2,
          pl: 2,
          pb: 1,
          fontStyle: "italic",
          fontSize: "0.85rem",
        }}
      >
        Disclaimer: The quiz results do not replace a veterinary consultation.
        We recommend booking a consult with your veterinarian for accurate
        diagnosis and treatment.
      </Typography>
    </>
  );
};

export default HealthAssessmentPage;
