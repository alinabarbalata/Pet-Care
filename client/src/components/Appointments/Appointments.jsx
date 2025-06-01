import React, { useState, useContext } from "react";
import Lottie from "lottie-react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AppointmentForm from "../AppointmentForm";
import AppointmentView from "../AppointmentView";
import AppContext from "../../state/AppContext";
import AppointmentsAdminView from "../AppointmentsAdminView/AppointmentsAdminView";
import CatStanding from "../../assets/animations/cat-standing.json";
import CatFalling from "../../assets/animations/cat-falling.json";
import Calendar from "../../assets/animations/calendar.json";
const Appointments = () => {
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [isSeeingAppointments, setIsSeeingAppointments] = useState(false);
  const globalState = useContext(AppContext);
  const [formState, setFormState] = useState({
    isVisible: false,
    isUpdating: false,
    appointment: null,
  });
  const handleSeeAppointmentClick = () => {
    setIsSeeingAppointments(true);
    setIsAddingAppointment(false);
  };

  const handleAddAppointmentClick = () => {
    setIsAddingAppointment(true);
    setIsSeeingAppointments(false);
    openCreateForm();
  };
  const openCreateForm = () => {
    setFormState({
      isVisible: true,
      isUpdating: false,
      appointment: null,
    });
  };
  const closeForm = () => {
    setFormState({
      isVisible: false,
      isUpdating: false,
      appointment: null,
    });
    setIsAddingAppointment(false);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          overflowY: "auto",
          width: "100%",
          height: "90vh",
          flexDirection:
            globalState.user?.data?.role === "owner" ? "initial" : "column",
        }}
      >
        {isSeeingAppointments || globalState.user?.data?.role === "vet" ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflowY: "auto",
            }}
          >
            <AppointmentView />
          </Box>
        ) : isAddingAppointment && formState.isVisible ? (
          <>
            <Box
              sx={{
                position: "fixed",
                top: 52,
                left: 400,
                width: 250,
                height: 250,
                zIndex: 1300,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              <Lottie
                animationData={CatFalling}
                loop
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AppointmentForm
                isUpdating={formState.isUpdating}
                appointment={formState.appointment}
                onSave={() => {
                  closeForm();
                }}
              />
            </Box>
          </>
        ) : globalState.user?.data?.role === "admin" ? (
          <AppointmentsAdminView />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                gap: 4,
              }}
            >
              <Stack direction="row" spacing={12}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Lottie
                    animationData={CatStanding}
                    style={{ width: 131 }}
                    loop
                  />
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "30px",
                      backgroundColor: "green",
                      width: "200px",
                    }}
                    onClick={handleSeeAppointmentClick}
                  >
                    See appointments
                  </Button>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Lottie animationData={Calendar} style={{ width: 70 }} loop />
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "30px",
                      backgroundColor: "green",
                      width: "200px",
                    }}
                    onClick={handleAddAppointmentClick}
                  >
                    Add appointment
                  </Button>
                </Box>
              </Stack>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};
export default Appointments;
