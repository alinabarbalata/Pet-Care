import React from "react";
import Navbar from "../NavBar";
import Sidebar from "../Sidebar";
import MyPets from "../MyPets/MyPets";

import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";

const Dashboard = () => {
  return (
    <Box>
      <Navbar />
      <Sidebar />
      <Box
        sx={{
          position: "absolute",
          overflowY: "auto",
          left: "20vw",
          top: "10vh",
          width: "80vw",
          height: "90vh",
          padding: "20px",
          backgroundColor: "#f3f3f3",
        }}
      >
        <Routes>
          <Route path="mypets" element={<MyPets />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
