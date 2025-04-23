import React, { useState, useEffect } from "react";
import PetStore from "../../state/stores/PetStore";
import PetCard from "../PetCard";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PetForm from "../PetForm";
import Box from "@mui/material/Box";

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const petStore = new PetStore();
  const [isAddingPet, setIsAddingPet] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      const petsData = await petStore.getAllPets();
      setPets(petsData);
    };
    fetchPets();
  }, []);

  const handleAddPetClick = () => {
    setIsAddingPet(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: "30px",
          padding: "20px",
          width: "100%",
          boxSizing: "border-box",
          overflowX: "auto",
        }}
      >
        {isAddingPet ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PetForm />
          </Box>
        ) : (
          <>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                sx={{ borderRadius: "30px", backgroundColor: "green" }}
                onClick={handleAddPetClick}
              >
                Add a pet
              </Button>
            </Stack>

            {pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </>
        )}
      </Box>
    </>
  );
};

export default MyPets;
