import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../state/AppContext";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { IonIcon } from "@ionic/react";
import { paw, heartCircle } from "ionicons/icons";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

const PetForm = ({ onPetCreated }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [colors, setColors] = useState([]);
  const [vaccinated, setVaccinated] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { pet } = useContext(AppContext);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [breeds, colors] = await Promise.all([
          pet.getAllBreeds(),
          pet.getAllColors(),
        ]);

        if (Array.isArray(breeds)) {
          setBreeds(breeds);
        } else {
          console.error("Failed to fetch breeds");
        }

        if (Array.isArray(colors)) {
          setColors(colors);
        } else {
          console.error("Failed to fetch colors");
        }
      } catch (err) {
        console.error("Data fetch error:", err);
      }
    };

    fetchData();
  }, [pet]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("breed", selectedBreed);
    formData.append("color", selectedColor);
    formData.append("type", "cat");
    formData.append("vaccinated", vaccinated);

    if (photoFile) {
      formData.append("photo", photoFile);
    }
    await pet.createPet(formData);
    if (onPetCreated) {
      onPetCreated();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Stack spacing={1} sx={{ p: 5, px: 7 }}>
        <ThemeProvider theme={Theme}>
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <FormHelperText id="pet-name">Name of the pet</FormHelperText>
            <OutlinedInput
              id="paw-icon"
              value={name}
              onChange={(e) => setName(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IonIcon icon={paw} />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <FormHelperText id="pet-age">Age</FormHelperText>
            <OutlinedInput
              id="heart-icon"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IonIcon icon={heartCircle} />
                </InputAdornment>
              }
              inputProps={{
                min: 0,
              }}
              sx={{
                '& input[type="number"]': {
                  "&::-webkit-inner-spin-button": {
                    display: "none",
                  },
                  "&::-webkit-outer-spin-button": {
                    display: "none",
                  },
                  MozAppearance: "textfield",
                },
              }}
            />
          </FormControl>

          <FormControl sx={{ m: 1 }} variant="outlined">
            <FormHelperText id="pet-breed">Breed</FormHelperText>
            <Select
              id="select-breed"
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {breeds.map((breed) => (
                <MenuItem key={breed._id} value={breed._id}>
                  {breed.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1 }} variant="outlined">
            <FormHelperText id="pet-color">Color</FormHelperText>
            <Select
              id="select-color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {colors.map((color) => (
                <MenuItem key={color._id} value={color._id}>
                  {color.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <RadioGroup
              row
              name="rg-vaccinated"
              value={vaccinated}
              onChange={(e) => setVaccinated(e.target.value === "true")}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="success" />}
                label="Vaccinated"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="success" />}
                label="Not vaccinated"
              />
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <FormHelperText>Upload pet photo</FormHelperText>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginBottom: "8px" }}
            />
          </FormControl>
        </ThemeProvider>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          sx={{ borderRadius: "12px" }}
        >
          Create pet
        </Button>
      </Stack>
    </Box>
  );
};

export default PetForm;
