import React, { useState, useEffect, useContext } from "react";
import PetCard from "../PetCard";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PetForm from "../PetForm";
import Box from "@mui/material/Box";
import AppContext from "../../state/AppContext";
const MyPets = () => {
  const globalState = useContext(AppContext);
  const [isAddingPet, setIsAddingPet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      if (globalState.pet.data.pets.length === 0) {
        await globalState.pet.getAllPets();
      }
      setIsLoading(false);
    };

    fetchPets();
  }, [globalState.pet]);

  const handleAddPetClick = () => {
    setIsAddingPet(true);
  };
  if (isLoading) {
    return <div>Loading pets...</div>;
  }
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

            {globalState.pet.data.pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </>
        )}
      </Box>
    </>
  );
};

export default MyPets;
