import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import PetCardView from "../PetCardView/PetCardView";

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/dashboard/mypets/${pet._id}`);
  };
  return (
    <>
      <Card sx={{ width: 260, borderRadius: 4 }}>
        <CardActionArea onClick={handleCardClick}>
          <CardMedia
            sx={{ height: 200 }}
            component="img"
            height="140"
            image={`http://localhost:5000${pet.photoUrl}`}
            alt={`${pet.name} photo`}
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
    </>
  );
};

export default PetCard;
