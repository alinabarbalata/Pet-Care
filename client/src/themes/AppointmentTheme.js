import { createTheme } from "@mui/material/styles";

const AppointmentTheme = createTheme({
  typography: {
    fontFamily: "'Times New Roman', Times, serif",
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          color: "black",
          marginLeft: 0,
          marginBottom: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "2px",
          height: "5vh",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
          },
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          color: "#00ab41",
          borderRadius: "6px",
          borderWidth: "1px",
          borderColor: "#e91e63",
          border: "1px solid",
          backgroundColor: "#e5f4e6",
        },
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          color: "#f8bbd0",
          borderRadius: "12px",
          borderColor: "black",
        },
      },
    },
  },
});

export default AppointmentTheme;
