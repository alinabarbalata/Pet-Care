import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../state/AppContext";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { IonIcon } from "@ionic/react";
import { paw } from "ionicons/icons";
import { ThemeProvider } from "@mui/material/styles";
import AppointmentTheme from "../../themes/AppointmentTheme";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";

import dayjs from "dayjs";

const AppointmentForm = ({ isUpdating, appointment, onSave }) => {
  const [selectedVet, setSelectedVet] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [notes, setNotes] = useState("");
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([]);

  const globalState = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedPets, fetchedVets] = await Promise.all([
          globalState.pet.getAllPets(),
          globalState.appointment.getAllVets(),
        ]);

        if (Array.isArray(fetchedPets)) {
          setPets(fetchedPets);
        } else {
          console.error("Failed to fetch pets");
        }

        if (Array.isArray(fetchedVets)) {
          setVets(fetchedVets);
        } else {
          console.error("Failed to fetch vets");
        }
      } catch (err) {
        console.error("Data fetch error:", err);
      }
    };

    fetchData();
  }, [globalState]);

  useEffect(() => {
    if (isUpdating && appointment) {
      setSelectedPet(appointment.pet._id);
      setSelectedVet(appointment.vet._id);
      setSelectedDate(dayjs(appointment.date));
      setSelectedTime(dayjs(appointment.date));
      setNotes(appointment.notes);
    }
  }, [isUpdating, appointment]);

  const handleSubmit = async () => {
    if (isUpdating) {
      const updatedData = {
        date: new Date(
          `${selectedDate.format("YYYY-MM-DD")}T${selectedTime.format(
            "HH:mm"
          )}:00`
        ).toISOString(),
        notes: notes,
      };
      await globalState.appointment.updateAppointment(
        selectedPet,
        appointment._id,
        updatedData
      );
    } else {
      await globalState.appointment.createAppointment(
        selectedPet,
        selectedVet,
        new Date(
          `${selectedDate.format("YYYY-MM-DD")}T${selectedTime.format(
            "HH:mm"
          )}:00`
        ).toISOString(),
        notes
      );
    }
    onSave();
  };
  return (
    <>
      <Box
        sx={{
          width: "40%",
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Stack spacing={2} sx={{ p: 5 }}>
          <ThemeProvider theme={AppointmentTheme}>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <FormHelperText id="outlined-weight-helper-text">
                Select Pet
              </FormHelperText>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={selectedPet}
                onChange={(e) => setSelectedPet(e.target.value)}
                disabled={isUpdating}
                sx={isUpdating ? { pointerEvents: "none", opacity: 0.6 } : {}}
              >
                {pets.map((pet) => (
                  <MenuItem key={pet._id} value={pet._id}>
                    {pet.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <FormHelperText id="outlined-weight-helper-text">
                Select Vet
              </FormHelperText>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={selectedVet}
                onChange={(e) => setSelectedVet(e.target.value)}
                disabled={isUpdating}
                sx={isUpdating ? { pointerEvents: "none", opacity: 0.6 } : {}}
              >
                {vets.map((vet) => (
                  <MenuItem key={vet._id} value={vet._id}>
                    {vet.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flex: 1 }}>
                  <FormHelperText>Select date</FormHelperText>
                  <DesktopDatePicker
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                  />
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                  <FormHelperText>Select time</FormHelperText>
                  <DigitalClock
                    value={selectedTime}
                    onChange={(newValue) => setSelectedTime(newValue)}
                    sx={{ height: "52px" }}
                  />
                </FormControl>
              </Stack>
            </LocalizationProvider>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <FormHelperText id="outlined-weight-helper-text">
                Notes
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                multiline
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                sx={{
                  height: "auto",
                  alignItems: "start",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IonIcon icon={paw} />
                  </InputAdornment>
                }
              />
            </FormControl>
          </ThemeProvider>
          <Button
            variant="contained"
            color="success"
            sx={{ borderRadius: "12px" }}
            onClick={handleSubmit}
          >
            {isUpdating ? "Update appointment" : "Add appointment"}
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default AppointmentForm;
