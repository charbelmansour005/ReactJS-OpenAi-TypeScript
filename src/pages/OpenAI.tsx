import React, { useState } from "react"
import { Card, Paper, Box, Grid, IconButton, Snackbar } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import { useAppDispatch } from "../redux/rtkHooks"
import { toggleTheme } from "../redux/themeSlice"
//cmp
import Background from "../components/Background"
import OutputCard from "../components/OutputCard"
import PromptInput from "../components/PromptInput"
import PromptButton from "../components/PromptButton"

export default function OpenAI() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [open, setOpen] = React.useState(false)
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
    /**
     * @fetch
     * axios displaying error behavior working with OpenAI
     */
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
    } catch (error: any) {
      setLoading(false)
      setError(true)
      console.error(error)
    }
  }

  const handleThemeChange = () => {
    dispatch(toggleTheme())
    setMode((mode) => !mode)
  }

  return (
    <React.Fragment>
      <Grid container component="main" sx={{ height: "100vh" }}>
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
            borderWidth: 1,
          }}
        >
          <OutputCard loading={loading} output={output} error={error} />
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
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 0,
                paddingBottom: 2,
                borderRadius: 1,
                border: 1,
                borderColor: "transparent",
                width: 400,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PromptInput handleChange={handleChange} />
              <PromptButton
                input={input}
                loading={loading}
                handleSubmit2={handleSubmit2}
              />
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
    </React.Fragment>
  )
}
