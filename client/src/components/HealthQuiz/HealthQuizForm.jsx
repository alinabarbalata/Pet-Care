import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Button,
  Typography,
  Box,
  FormControl,
  FormHelperText,
  Select,
  Breadcrumbs,
  MenuItem,
  Link,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Lottie from "lottie-react";
import CatWindow from "../../assets/animations/cat-window.json";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ThemeProvider } from "@mui/material/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AppContext from "../../state/AppContext";
import AppointmentTheme from "../../themes/AppointmentTheme";
const HealthQuiz = () => {
  const [step, setStep] = useState("select");
  const [selectedPet, setSelectedPet] = useState("");
  const [pets, setPets] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [checkedSymptoms, setCheckedSymptoms] = useState([]);
  const [report, setReport] = useState("");
  const navigate = useNavigate();

  const globalState = useContext(AppContext);
  const handleNext = () => {
    if (selectedPet) {
      setStep("quiz");
    }
  };

  useEffect(() => {
    const fetchPets = async () => {
      const fetchedPets = await globalState.pet.getAllPets();
      if (fetchedPets) {
        setPets(fetchedPets);
      }
    };
    const fetchSymptoms = async () => {
      const fetchedSymptoms = await globalState.health.getAllSymptoms();
      if (fetchedSymptoms) setSymptoms(fetchedSymptoms);
      console.log("Symptoms: ", fetchedSymptoms);
    };

    fetchPets();
    fetchSymptoms();
  }, []);

  const handleCreateReport = async () => {
    if (!selectedPet || checkedSymptoms.length === 0) return;

    console.log("Selected pet: ", selectedPet);
    console.log("Checked symptoms: ", checkedSymptoms);
    try {
      const response = await globalState.health.createQuizReport(
        selectedPet,
        checkedSymptoms
      );
      console.log("Report response:", response.quizReport.possibleDiseases[0]);
      setReport(response.quizReport);
      setStep("results");
    } catch (error) {
      console.error("Failed to submit quiz");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#E6F2E7",
        gap: 5,
        ml: 8,
        mr: 8,
      }}
    >
      <Box
        sx={{
          height: "80vh",
          width: "50%",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => navigate("/dashboard/healthtracker")}
          sx={{
            position: "absolute",
            top: 3,
            right: 3,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Stack spacing={2}>
          <>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              {(step === "select" || step === "quiz" || step === "results") && (
                <Link
                  underline="hover"
                  color="green"
                  component="button"
                  onClick={() => setStep("select")}
                >
                  Select pet
                </Link>
              )}
              {(step === "quiz" || step === "results") && (
                <Link
                  underline="hover"
                  color="green"
                  component="button"
                  onClick={() => setStep("quiz")}
                >
                  Quiz
                </Link>
              )}
              {step === "results" && (
                <Link
                  underline="hover"
                  color="green"
                  component="button"
                  onClick={() => setStep("results")}
                >
                  Results
                </Link>
              )}
            </Breadcrumbs>
          </>
        </Stack>
        {step === "select" ? (
          <>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ThemeProvider theme={AppointmentTheme}>
                <FormControl fullWidth>
                  <FormHelperText sx={{ color: "#006400" }}>
                    Select Your Pet
                  </FormHelperText>
                  <Select
                    value={selectedPet}
                    onChange={(e) => setSelectedPet(e.target.value)}
                  >
                    {pets.map((pet) => (
                      <MenuItem key={pet._id} value={pet._id}>
                        {pet.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ThemeProvider>
            </Box>
            <Box sx={{ textAlign: "center", mb: 5 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!selectedPet}
                sx={{
                  borderRadius: "30px",
                  backgroundColor: "green",
                  width: "50%",
                }}
              >
                Start Quiz
              </Button>
            </Box>
          </>
        ) : step === "quiz" ? (
          <>
            <Box
              sx={{
                overflowY: "auto",
                mt: 2,
                mb: 2,
              }}
            >
              <Typography variant="h7">
                Please select the symptoms{" "}
                <strong>{pets.find((p) => p._id === selectedPet)?.name}</strong>{" "}
                experiences:
              </Typography>
            </Box>

            <Box
              sx={{
                overflowY: "auto",
                maxHeight: "50vh",
                pr: 1,
              }}
            >
              {symptoms.map((symptom) => (
                <FormGroup key={symptom._id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="success"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
                        checked={checkedSymptoms.includes(symptom._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCheckedSymptoms((prev) => [
                              ...prev,
                              symptom._id,
                            ]);
                          } else {
                            setCheckedSymptoms((prev) =>
                              prev.filter((id) => id !== symptom._id)
                            );
                          }
                        }}
                      />
                    }
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <Typography sx={{ fontSize: "0.85rem" }}>
                          {symptom.name}
                        </Typography>
                        <Tooltip
                          title={symptom.description || "No description"}
                          arrow
                        >
                          <InfoOutlinedIcon
                            color="action"
                            fontSize="small"
                            sx={{ cursor: "pointer" }}
                          />
                        </Tooltip>
                      </Box>
                    }
                  />
                </FormGroup>
              ))}
            </Box>
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleCreateReport}
                disabled={checkedSymptoms.length === 0}
                sx={{
                  borderRadius: "30px",
                  backgroundColor: "green",
                  width: "50%",
                }}
              >
                Submit Quiz
              </Button>
            </Box>
          </>
        ) : (
          step === "results" &&
          report && (
            <>
              <Typography
                variant="h6"
                sx={{
                  mt: 2,
                  mb: 2,
                  fontWeight: "bold",
                  color: "green",
                  fontFamily: "'Times New Roman', Times, serif",
                }}
              >
                Health Report for{" "}
                {pets.find((p) => p._id === selectedPet)?.name}
              </Typography>

              <List
                sx={{
                  fontFamily: "'Times New Roman', Times, serif",
                }}
              >
                {report.possibleDiseases.map((diagnosis, index) => (
                  <React.Fragment key={diagnosis._id}>
                    <ListItem alignItems="flex-start" sx={{ display: "block" }}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "'Times New Roman', Times, serif" }}
                      >
                        {diagnosis.disease.name}
                      </Typography>
                      <ListItemText
                        sx={{ fontFamily: "'Times New Roman', Times, serif" }}
                        primary={`Likelihood: ${diagnosis.likelihood}%`}
                        secondary={`Matched Symptoms: ${diagnosis.matchedSymptoms}/${diagnosis.totalSymptoms}`}
                      />
                    </ListItem>
                    {index < report.possibleDiseases.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: "auto",
                  pb: 1,
                  fontStyle: "italic",
                  fontSize: "0.85rem",
                }}
              >
                Disclaimer: The quiz results do not replace a veterinary
                consultation. We recommend booking a consult with your
                veterinarian for accurate diagnosis and treatment.
              </Typography>
            </>
          )
        )}
      </Box>
      <Box
        sx={{
          width: "50%",
          px: 8,
          color: "#1B5E20",
          fontFamily: `"Times New Roman", Times, serif`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: 700, letterSpacing: "0.05em" }}
        >
          Health Quiz
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            maxWidth: 600,
            mb: 4,
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          Answer a few simple questions about your pet’s symptoms to get an
          initial health assessment. This tool helps you understand potential
          concerns before consulting a veterinarian.
        </Typography>
        <Box sx={{ width: 300, height: 300 }}>
          <Lottie animationData={CatWindow} loop />
        </Box>
      </Box>
    </Box>
  );
};

export default HealthQuiz;
