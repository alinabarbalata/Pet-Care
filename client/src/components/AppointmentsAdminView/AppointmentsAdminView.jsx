import React, { useState, useEffect, useContext } from "react";
import { Stack, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AppContext from "../../state/AppContext";

const AppointmentsAdminView = () => {
  const [appointments, setAppointments] = useState([]);
  const globalState = useContext(AppContext);
  useEffect(() => {
    const fetchAppointments = async () => {
      const fetchedAppointments =
        await globalState.appointment.getAllAppointments();
      console.log(fetchedAppointments);
      setAppointments(fetchedAppointments);
    };

    fetchAppointments();
  }, []);
  const columns = [
    {
      field: "owner",
      headerName: "Owner",
      width: 180,
      renderCell: (params) => {
        return params.row.owner.email;
      },
    },
    {
      field: "pet",
      headerName: "Pet",
      width: 180,
      renderCell: (params) => {
        return params.row.pet.name;
      },
    },
    {
      field: "vet",
      headerName: "Vet",
      width: 180,
      renderCell: (params) => {
        return params.row.vet.email;
      },
    },
    { field: "date", headerName: "Appointment Date", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return params.row.status.name;
      },
    },
    { field: "notes", headerName: "Notes", width: 150 },
    { field: "createdAt", headerName: "Created At", width: 180 },
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
          Manage Appointments
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
            rows={appointments}
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
export default AppointmentsAdminView;
