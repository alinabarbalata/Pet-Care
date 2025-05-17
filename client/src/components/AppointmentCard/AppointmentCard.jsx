import { useState, useEffect, useContext } from "react";
import {
  Stack,
  Box,
  FormHelperText,
  FormControl,
  Button,
  TextField,
  Avatar,
  Typography,
  Chip,
  Select,
  MenuItem,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import AppointmentTheme from "../../themes/AppointmentTheme";
import AppointmentForm from "../AppointmentForm";
import AppContext from "../../state/AppContext";

const AppointmentCard = ({
  appointment,
  onEdit,
  isUpdating,
  onUpdateStatus,
  statuses,
  statusColors,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const globalState = useContext(AppContext);
  useEffect(() => {
    if (appointment?.status?.name && selectedStatus === "") {
      setSelectedStatus(appointment.status.name);
    }
  }, [appointment, selectedStatus]);

  const handleStatusChange = (value) => setSelectedStatus(value);

  const handleSaveChanges = async (appointment) => {
    try {
      console.log("Selected status at save:", selectedStatus);
      const result = await globalState.appointment.changeAppointmentStatus(
        appointment.pet._id,
        appointment._id,
        selectedStatus
      );
      console.log("Appointment status updated:", result);
      onUpdateStatus();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleCancel = async (appointment) => {
    try {
      const result = await globalState.appointment.changeAppointmentStatus(
        appointment.pet._id,
        appointment._id,
        "Cancelled"
      );
      console.log("Appointment status updated:", result);
      onUpdateStatus();
    } catch (error) {
      console.error("Error canceling appointment:", error);
      alert("Error. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={AppointmentTheme} key={appointment._id}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 2,
          width: "100%",
        }}
      >
        {isUpdating ? (
          <AppointmentForm
            isUpdating={true}
            appointment={appointment}
            onSave={{}}
          />
        ) : (
          <Box
            sx={{
              width: "55%",
              margin: "0 auto",
              borderRadius: 2,
              boxShadow: 3,
              p: 2,
              m: 1,
              bgcolor: "#FFFFFF",
            }}
          >
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <FormControl variant="outlined">
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                  }}
                >
                  Appointment Info for {appointment.pet.name}
                </Typography>
              </FormControl>
            </Box>
            <Stack direction="row" spacing={7} sx={{ p: 3, pb: 4 }}>
              <Stack spacing={1} sx={{ flex: 1 }}>
                <FormControl sx={{ m: 1 }} variant="outlined">
                  {globalState.user?.data?.role === "owner" ? (
                    <FormHelperText id="outlined-weight-helper-text">
                      Veterinary
                    </FormHelperText>
                  ) : globalState.user?.data?.role === "vet" ? (
                    <FormHelperText id="outlined-weight-helper-text">
                      Owner
                    </FormHelperText>
                  ) : null}
                  <TextField
                    value={
                      globalState.user?.data?.role === "owner"
                        ? appointment.vet.email
                        : appointment.owner.email
                    }
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    sx={{
                      "& .MuiInputBase-root": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="outlined">
                  <FormHelperText id="outlined-weight-helper-text">
                    Date and time
                  </FormHelperText>
                  <TextField
                    value={new Date(appointment.date).toLocaleString()}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    sx={{
                      "& .MuiInputBase-root": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="outlined">
                  {globalState.user?.data?.role === "owner" ? (
                    <Chip
                      label={appointment.status?.name}
                      sx={{
                        backgroundColor:
                          statusColors[appointment.status?.name] || "#757575",
                        color: "#fff",
                        borderRadius: "16px",
                        mt: 2,
                      }}
                    />
                  ) : (
                    <Select
                      fullWidth
                      value={selectedStatus}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      sx={{
                        width: "100%",
                        height: "45%",
                        backgroundColor: statusColors[selectedStatus],
                        color: "#fff",
                        borderRadius: "16px",
                        mt: 2,
                        textAlign: "center",
                        fontSize: "0.8rem",
                        fontWeight: "normal",
                      }}
                    >
                      {statuses.map((status) => (
                        <MenuItem
                          key={status._id}
                          value={status.name}
                          disabled={
                            status.name === "Pending" ||
                            status.name === "Cancelled" ||
                            (appointment.status?.name !== "Pending" &&
                              appointment.status?.name !== "Confirmed")
                          }
                        >
                          {status.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </FormControl>
              </Stack>
              <Stack spacing={2} sx={{ flex: 1 }}>
                <FormControl
                  sx={{
                    m: 1,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                  variant="outlined"
                >
                  <FormHelperText id="outlined-weight-helper-text">
                    Motive for appointment
                  </FormHelperText>
                  <TextField
                    value={appointment.notes}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    multiline
                    sx={{
                      flex: 1,
                      "& .MuiInputBase-root": {
                        backgroundColor: "#f5f5f5",
                        minHeight: "100%",
                      },
                    }}
                  />
                </FormControl>
              </Stack>
            </Stack>
            {(globalState.user?.data?.role === "vet" ||
              (globalState.user?.data?.role === "owner" &&
                (appointment.status?.name === "Confirmed" ||
                  appointment.status?.name === "Pending"))) && (
              <Stack
                direction="row"
                spacing={5}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  sx={{ width: "35%", alignItems: "center" }}
                  onClick={() => {
                    if (globalState.user?.data?.role === "owner") {
                      onEdit(appointment);
                    } else {
                    }
                  }}
                >
                  {globalState.user?.data?.role === "owner"
                    ? "Update Appointment"
                    : "See details"}
                </Button>
                <Button
                  variant="outlined"
                  color={
                    globalState.user?.data?.role === "owner"
                      ? "error"
                      : "primary"
                  }
                  sx={{ width: "35%", alignItems: "center" }}
                  onClick={() => {
                    if (globalState.user?.data?.role === "owner") {
                      handleCancel(appointment);
                    } else {
                      handleSaveChanges(appointment);
                    }
                  }}
                >
                  {globalState.user?.data?.role === "owner"
                    ? "Cancel Appointment"
                    : "Save changes"}
                </Button>
              </Stack>
            )}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default AppointmentCard;
