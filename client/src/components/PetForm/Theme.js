import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
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
          borderRadius: "12px",
          height: "5vh",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
          },
        },
      },
    },
  },
});

export default Theme;
