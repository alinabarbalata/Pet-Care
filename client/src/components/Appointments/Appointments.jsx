import React, { useState, useContext } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AppointmentForm from "../AppointmentForm";
import AppointmentView from "../AppointmentView";
import AppContext from "../../state/AppContext";
import AppointmentsAdminView from "../AppointmentsAdminView/AppointmentsAdminView";

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
  };
  const fetchAppointments = async () => {
    const appointmentsData = await globalState.appointment.getAllAppointments();
    setAppointments(appointmentsData);
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
        ) : isAddingAppointment & formState.isVisible ? (
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
        ) : globalState.user?.data?.role === "admin" ? (
          <AppointmentsAdminView />
        ) : (
          <Stack
            direction="row"
            spacing={12}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
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
          </Stack>
        )}
      </Box>
    </>
  );
};
export default Appointments;
