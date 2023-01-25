import * as React from "react"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import { TextField, Card } from "@mui/material"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState } from "react"
import { makeStyles } from "@mui/styles"
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Tooltip from "@mui/material/Tooltip"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import Background from "../components/Background"
import OutputCard from "../components/OutputCard"
import { useAppSelector, useAppDispatch } from "../redux/rtkHooks"
import { toggleTheme } from "../redux/themeSlice"

const theme = createTheme()

export default function OpenAI() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [open, setOpen] = React.useState(false)
  const theme = useAppSelector((state) => state.theme)
  const [mode, setMode] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
  }

  const handleSubmit2 = async (event: any) => {
    event.preventDefault()
    try {
      setLoading(true)
      setError(false)
      setOutput("")
      const token = import.meta.env.VITE_XX
      const payload = {
        prompt: input,
        max_tokens: 100,
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
      const response = await fetch(
        "https://api.openai.com/v1/engines/davinci/completions",
        options
      )
      const json = await response.json()
      setOutput(json.choices[0].text)
      setLoading(false)
      setOpen(true)
      // const role = "admin"
      // localStorage.setItem("role", role)
    } catch (error: any) {
      setLoading(false)
      setError(true)
      console.error(error)
    }
  }

  const classes = useStyles()

  const handleThemeChange = () => {
    dispatch(toggleTheme())
    setMode((mode) => !mode)
  }

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Background />
        <Grid
          item
          xs={12}
          sm={8}
          md={7}
          component={Paper}
          elevation={3}
          square
          style={{
            // backgroundColor: "#ffffff",
            borderWidth: 1,
            // borderColor: "black",
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              mt: 2,
            }}
          >
            <OutputCard loading={loading} output={output} error={error} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card
              component="form"
              variant="outlined"
              noValidate
              sx={{
                mt: 0,
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                bottom: 0,
                mb: 3,
                // backgroundColor: "#f7f7f8",
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 0,
                paddingBottom: 2,
                borderRadius: 1,
                border: 1,
                borderColor: "transparent",
                // borderColor: "#c8c9d5",
                width: 400,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                className={classes.rootInput}
                margin="normal"
                fullWidth
                id="prompt"
                multiline={true}
                rows={4}
                placeholder="One of the many reasons I prefer driving a Tesla is that"
                name="prompt"
                sx={{
                  // backgroundColor: "#f7f7f8",
                  width: 380,
                  mb: 2,
                  fontFamily: "Inter",
                }}
                color="warning"
                size="small"
                variant="filled"
                onChange={handleChange}
                autoComplete="off"
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Tooltip
                  title={
                    !input ? `Write something first` : `Generate completion`
                  }
                  placement="right"
                >
                  <span>
                    <Button
                      onClick={handleSubmit2}
                      fullWidth
                      variant="contained"
                      disableElevation
                      disabled={!input || loading}
                      size="small"
                      sx={{
                        width: "30%",
                        textTransform: "capitalize",
                        fontSize: 14,
                      }}
                      className={classes.root}
                    >
                      Submit
                    </Button>
                  </span>
                </Tooltip>
              </Box>
            </Card>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleThemeChange}
              sx={{
                position: "absolute",
                top: 0,
                left: 1,
                color: "white",
                margin: 1,
              }}
            >
              {mode ? (
                <DarkModeIcon fontSize="small" />
              ) : (
                <WbSunnyIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        </Grid>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Success!"
          action={action}
        />
      </Grid>
    </>
  )
}

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#fff",
    },
  },
  rootInput: {
    underline: {
      "&:hover:not($disabled):before": {
        backgroundColor: "transparent",
        height: 1,
      },
    },
  },
})
