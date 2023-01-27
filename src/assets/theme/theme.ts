import { createTheme } from "@mui/material"

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#dbdbdb",
    },
    background: {
      paper: "#f7f7f8",
      default: "#dbdbdb",
    },
    text: {
      primary: "#11111",
    },
    warning: {
      light: "#24a37f",
      main: "#24a37f",
    },
    success: {
      light: "#24a37f",
      main: "#24a37f",
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#313541",
      default: "#343541",
    },
    text: {
      primary: "#fff",
    },
    warning: {
      light: "#24a37f",
      main: "#24a37f",
    },
    success: {
      light: "#24a37f",
      main: "#24a37f",
    },
  },
})
