import React, { useState } from "react";

import PetStore from "../../state/stores/PetStore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

const PetCard = ({ pet }) => {
  const petStore = new PetStore();
  const [isCardClicked, setIsCardClicked] = useState(false);

  const handleCardClick = async (e) => {
    setIsCardClicked(true);
  };
  return (
    <>
      {isCardClicked ? (
        <PetCardView />
      ) : (
        <Card sx={{ width: 260, borderRadius: 4 }}>
          <CardActionArea onClick={handleCardClick}>
            <CardMedia
              sx={{ height: 200 }}
              component="img"
              height="140"
              image="/src/assets/black-cat.jpg"
              alt="pet-img"
            />
            <CardContent sx={{ backgroundColor: "rgb(145, 142, 99) " }}>
              <Typography gutterBottom variant="h5" component="div">
                {pet.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {pet.age}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};

export default PetCard;
