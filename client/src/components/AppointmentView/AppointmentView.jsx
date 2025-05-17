import { useState, useEffect, useContext } from "react";

import AppointmentCard from "../AppointmentCard/AppointmentCard";
import AppointmentForm from "../AppointmentForm";
import AppContext from "../../state/AppContext";

import Box from "@mui/material/Box";
const AppointmentView = () => {
  const [appointments, setAppointments] = useState([]);
  const [formState, setFormState] = useState({
    isVisible: false,
    isUpdating: false,
    appointment: null,
  });
  const [statuses, setStatuses] = useState([]);
  const globalState = useContext(AppContext);
  const statusColors = {
    Pending: "#deb71d",
    Confirmed: "#2e7d32",
    Rejected: "#d32f2f",
    Cancelled: "#9e9e9e",
    Completed: "#1565c0",
    "No-show": "#ff5722",
  };

  const openUpdateForm = (appointment) => {
    setFormState({
      isVisible: true,
      isUpdating: true,
      appointment,
    });
  };
  const closeForm = () => {
    setFormState({
      isVisible: false,
      isUpdating: false,
      appointment: null,
    });
  };
  const fetchStatuses = async () => {
    const statusData = await globalState.appointment.getAllStatuses();
    setStatuses(statusData);
  };
  const fetchAppointments = async () => {
    const appointmentsData = await globalState.appointment.getAllAppointments();
    setAppointments(appointmentsData);
  };

  const refreshAppointments = async () => {
    fetchAppointments();
  };

  useEffect(() => {
    fetchAppointments();
    fetchStatuses();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        boxShadow: 3,
        overflowY: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {formState.isUpdating ? (
        <>
          <AppointmentForm
            isUpdating={formState.isUpdating}
            appointment={formState.appointment}
            onSave={() => {
              closeForm();
              refreshAppointments();
            }}
          />
        </>
      ) : (
        appointments.map((appointment) => (
          <AppointmentCard
            key={appointment._id}
            appointment={appointment}
            onUpdateStatus={() => {
              refreshAppointments();
            }}
            onEdit={(appointment) => {
              openUpdateForm(appointment);
            }}
            isUpdating={
              formState.isUpdating &&
              formState.appointment?._id === appointment._id
            }
            statuses={statuses}
            statusColors={statusColors}
          />
        ))
      )}
    </Box>
  );
};
export default AppointmentView;
