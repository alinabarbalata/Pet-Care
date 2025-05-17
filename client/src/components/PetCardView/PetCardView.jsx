import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Box, Typography } from "@mui/material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import blackCat from "../../assets/black-cat.jpg";
import { useParams } from "react-router-dom";
import AppContext from "../../state/AppContext";

const PetCardView = () => {
  const { pid } = useParams();
  const [pet, setPet] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const globalState = useContext(AppContext);
  const navigate = useNavigate();
  const statusColors = {
    Pending: "#deb71d",
    Confirmed: "#2e7d32",
    Rejected: "#d32f2f",
    Cancelled: "#9e9e9e",
    Completed: "#1565c0",
    "No-show": "#ff5722",
  };
  useEffect(() => {
    const fetchOnePet = async () => {
      const singlePet = await globalState.pet.getOnePet(pid);
      console.log("Response for get one pet in PetCardView", singlePet);
      setPet(singlePet);
    };
    const fetchAppointmentsForPet = async () => {
      const appointmentsForPet =
        await globalState.appointment.getAllAppointmentsForPet(pid);
      console.log(
        "Response for get all appointments for one pet in PetCardView",
        appointmentsForPet
      );
      setAppointments(appointmentsForPet);
    };
    fetchOnePet();
    fetchAppointmentsForPet();
  }, [pid]);

  const handleClick = (appointment) => {
    console.log("Clicked appointment: ", appointment);
    navigate(`/dashboard/appointments/${pet._id}/${appointment._id}`);
  };
  return (
    <>
      {pet ? (
        <Box
          sx={{
            width: "85%",
            height: "auto",
            boxShadow: 3,
            m: "auto",
            mt: 6,
          }}
        >
          <Box sx={{ p: 2, borderRadius: 2, backgroundColor: "#0f9882" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="white">
                  {pet.name}
                </Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mt: 2, justifyContent: "center" }}
                >
                  <Typography variant="body1" color="white">
                    {pet.age} y.o.
                  </Typography>
                  <Typography variant="body1" color="white">
                    {pet.breed.name}
                  </Typography>
                  <Typography variant="body1" color="white">
                    {pet.color.name}
                  </Typography>
                </Stack>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    boxShadow: 4,
                    padding: 1,
                    backgroundColor: "#f9f9f9",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={blackCat}
                    alt="Pet"
                    sx={{
                      width: 150,
                      height: 150,
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" color="#343332">
              Appointments History
            </Typography>
            <List>
              {appointments.map((appointment) => (
                <ListItem
                  key={appointment._id}
                  button
                  onClick={() => handleClick(appointment)}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 30, color: "f9f9f9" }}>
                    <ArrowForwardIosIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={appointment.vet.email}
                    secondary={appointment.date}
                    sx={{ flexGrow: 1 }}
                  />
                  <Chip
                    label={appointment.status.name}
                    size="small"
                    sx={{
                      marginLeft: 2,
                      backgroundColor: statusColors[appointment.status.name],
                      color: "white",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      ) : (
        <Typography textAlign="center" mt={4} color="white">
          Loading pet data...
        </Typography>
      )}
    </>
  );
};

export default PetCardView;
