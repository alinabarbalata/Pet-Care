import React from "react";
import Navbar from "../NavBar";
import Sidebar from "../Sidebar";
import MyPets from "../MyPets/MyPets";
import { Routes, Route } from "react-router-dom";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <div className="dashboard-wrapper">
          <div className="main-content">
            <Routes>
              <Route path="mypets" element={<MyPets />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
