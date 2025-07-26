import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Lottie from "lottie-react";
import CatScratching from "../../assets/animations/cat-scratching.json";
import AppContext from "../../state/AppContext";
const HomePage = () => {
  const navigate = useNavigate();
  const globalContext = useContext(AppContext);

  const getWelcomeText = () => {
    if (globalContext.user.data.role === "owner") {
      return "Manage your pets with ease — track appointments, monitor their health, and keep everything organized in one place. Start by selecting a section in the sidebar.";
    } else if (globalContext.user.data.role === "vet") {
      return "Stay on top of your schedule — view and manage your upcoming appointments with pet owners in one convenient place.";
    } else if (globalContext.user.data.role === "admin") {
      return "Oversee and manage the entire Pet Care platform — monitor user activity, manage system data, and ensure everything runs smoothly. Start by selecting a section in the sidebar.";
    }
  };

  const handleClick = () => {
    if (
      globalContext.user.data.role === "owner" ||
      globalContext.user.data.role === "admin"
    ) {
      navigate(`/dashboard/mypets`);
    } else if (globalContext.user.data.role === "vet") {
      navigate("dashboard/appointments");
    }
  };
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 4,
        color: "#1B5E20",
        fontFamily: `"Times New Roman", Times, serif`,
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700, letterSpacing: "0.05em" }}
      >
        Welcome to Pet Care
      </Typography>

      <Typography
        variant="h6"
        component="p"
        sx={{ maxWidth: 600, mb: 4, fontWeight: 500, lineHeight: 1.6 }}
      >
        {getWelcomeText()}
      </Typography>
      <Box sx={{ width: 300, mb: 3 }}>
        <Lottie animationData={CatScratching} loop={true} />
      </Box>
      <Button
        variant="contained"
        color="success"
        size="large"
        sx={{
          borderRadius: 8,
          px: 5,
          textTransform: "none",
          boxShadow:
            "0px 4px 10px rgba(86, 171, 47, 0.5), 0px 0px 20px rgba(134, 203, 98, 0.4)",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#4CAF50",
            boxShadow:
              "0px 6px 14px rgba(76, 175, 80, 0.8), 0px 0px 25px rgba(139, 195, 74, 0.6)",
          },
        }}
        onClick={handleClick}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default HomePage;
