import { Routes } from "./routes/Routes"
import { darkTheme, lightTheme } from "./assets/theme/theme"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"

type Props = {}

const App = (props: Props) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  )
}

export default App
