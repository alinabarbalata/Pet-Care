import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import AuthGuard from "./components/AuthGuard";

import { useState } from "react";
import AppContext from "./state/AppContext";

import UserStore from "./state/stores/UserStore";
import PetStore from "./state/stores/PetStore";
import AppointmentStore from "./state/stores/AppointmentStore";
import HealthStore from "./state/stores/HealthStore";

import "./App.css";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const [userStore] = useState(new UserStore());
  const [petStore] = useState(new PetStore());
  const [appointmentStore] = useState(new AppointmentStore());
  const [healthStore] = useState(new HealthStore());
  return (
    <AppContext.Provider
      value={{
        user: userStore,
        pet: petStore,
        appointment: appointmentStore,
        health: healthStore,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route
            path="/dashboard/*"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
