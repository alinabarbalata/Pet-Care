import React from "react";
import Navbar from "../NavBar";
import Sidebar from "../Sidebar";
import MyPets from "../MyPets/MyPets";
import Appointments from "../Appointments";

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
          backgroundColor: "#f3f3f3",
        }}
      >
        <Routes>
          <Route path="mypets" element={<MyPets />} />
          <Route path="appointments" element={<Appointments />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
