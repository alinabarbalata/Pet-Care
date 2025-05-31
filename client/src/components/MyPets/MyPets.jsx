import React, { useState, useEffect, useContext } from "react";
import PetCard from "../PetCard";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PetForm from "../PetForm";
import Lottie from "lottie-react";
import CatSleeping from "../../assets/animations/cat-sleeping.json";
import { Box, Typography } from "@mui/material";
import AppContext from "../../state/AppContext";
import PetsAdminView from "../PetsAdminView";
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
          overflowY: "auto",
          maxHeight: "100vh",
        }}
      >
        {globalState.user.data.role === "owner" ? (
          isAddingPet ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: 10,
                p: 3,
                boxSizing: "border-box",
              }}
            >
              <Box
                sx={{
                  flex: "1 1 50%",
                  px: 4,
                  color: "#1B5E20",
                  fontFamily: `"Times New Roman", Times, serif`,
                }}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{ fontWeight: 700, letterSpacing: "0.05em" }}
                >
                  Add Your Pet
                </Typography>

                <Typography
                  variant="h6"
                  component="p"
                  sx={{
                    maxWidth: 600,
                    mb: 4,
                    fontWeight: 500,
                    lineHeight: 1.6,
                  }}
                >
                  Please fill out the form with details about your pet including
                  name, breed, and age. Keeping the profile updated helps us
                  provide the best care possible.
                  <br />
                  <br /> Need help? Contact our support team anytime.
                </Typography>
                <Box sx={{ width: 300, ml: 9 }}>
                  <Lottie animationData={CatSleeping} loop={true} />
                </Box>
              </Box>
              <Box
                sx={{
                  px: 4,
                  flex: "1 1 50%",
                }}
              >
                <PetForm />
              </Box>
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
          )
        ) : globalState.user.data.role === "admin" ? (
          <PetsAdminView />
        ) : null}
      </Box>
    </>
  );
};

export default MyPets;
