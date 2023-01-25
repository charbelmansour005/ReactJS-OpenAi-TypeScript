import { Routes } from "./routes/Routes"
import { darkTheme, lightTheme } from "./assets/theme/theme"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { useAppSelector } from "./redux/rtkHooks"

type Props = {}

const App = (props: Props) => {
  const theme = useAppSelector((state) => state?.theme)

  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  )
}

export default App
