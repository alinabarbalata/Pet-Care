import React, { useState, useEffect, useContext } from "react";
import { Stack, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AppContext from "../../state/AppContext";

const PetsAdminView = () => {
  const [pets, setPets] = useState([]);
  const globalState = useContext(AppContext);
  useEffect(() => {
    const fetchPets = async () => {
      const fetchedPets = await globalState.pet.getAllPets();
      console.log("Fetched pets", fetchedPets);
      setPets(fetchedPets);
    };

    fetchPets();
  }, []);
  const columns = [
    {
      field: "name",
      headerName: "Pet Name",
      width: 100,
    },
    {
      field: "owner",
      headerName: "Owner",
      width: 140,
      renderCell: (params) => {
        return params.row.owner.email;
      },
    },
    {
      field: "age",
      headerName: "Age",
      width: 60,
    },
    {
      field: "breed",
      headerName: "Breed",
      width: 130,
      renderCell: (params) => {
        return params.row.breed.name;
      },
    },
    {
      field: "color",
      headerName: "Color",
      width: 130,
      renderCell: (params) => {
        return params.row.color.name;
      },
    },
    {
      field: "type",
      headerName: "Type",
      width: 60,
    },
    {
      field: "vaccinated",
      headerName: "Is Vaccinated",
      width: 100,
    },
    { field: "createdAt", headerName: "Created At", width: 180 },
    { field: "updatedAt", headerName: "Updated At", width: 180 },
  ];
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          width: "100%",
          padding: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "950",
            color: "grey.800",
            fontFamily: `"Times New Roman", Times, serif`,
          }}
        >
          Manage Pets
        </Typography>
        <Typography>Another element</Typography>
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "calc(100vh - 10vh)",
          p: 2,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            boxShadow: 3,
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <DataGrid
            rows={pets}
            getRowId={(row) => row._id}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 25,
                },
              },
            }}
            pageSizeOptions={[25]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </>
  );
};
export default PetsAdminView;
