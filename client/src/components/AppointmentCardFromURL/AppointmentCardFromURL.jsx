import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../state/AppContext";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import Box from "@mui/material/Box";

const AppointmentCardFromURL = () => {
  const { pid, aid } = useParams();
  const [appointment, setAppointment] = useState(null);
  const globalState = useContext(AppContext);
  const [formState, setFormState] = useState({
    isVisible: false,
    isUpdating: false,
    appointment: null,
  });

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
  useEffect(() => {
    const fetchAppointment = async () => {
      if (pid && aid) {
        const appointmentData = await globalState.appointment.getOneAppointment(
          pid,
          aid
        );
        console.log("Appointment one: ", appointmentData);
        setAppointment(appointmentData);
      }
    };
    fetchAppointment();
  }, [aid, pid]);

  if (!appointment) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <AppointmentCard
          key={appointment._id}
          appointment={appointment}
          onUpdateStatus={() => {}}
          onEdit={(appointment) => {
            openUpdateForm(appointment);
          }}
          isUpdating={
            formState.isUpdating &&
            formState.appointment?._id === appointment._id
          }
          statuses={appointment.status.name}
          statusColors={statusColors}
        />
      </Box>
    </>
  );
};

export default AppointmentCardFromURL;
