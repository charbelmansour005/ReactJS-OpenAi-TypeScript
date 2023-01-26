import React, { useState } from "react"
import { Card, Paper, Box, Grid, IconButton, Snackbar } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import { useAppDispatch } from "../redux/rtkHooks"
import { toggleTheme } from "../redux/themeSlice"
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone"
import SendSharpIcon from "@mui/icons-material/SendSharp"
//cmp
import Background from "../components/Background"
import OutputCard from "../components/OutputCard"
import PromptInput from "../components/PromptInput"
import PromptButton from "../components/PromptButton"

export default function OpenAI() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<any>([])
  const [base, setBase] = useState("")
  // const [output, setOutput] = useState<string>("")
  const [model, setModel] = useState<string>("")
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

  const handleBusinessLogic = async () => {
    try {
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
      setModel(json.model)
      setLoading(false)
      setOpen(true)
      setBase(input)
    } catch (error: any) {
      setLoading(false)
      setError(true)
      console.error(error)
    }
  }

  const handleSubmit2 = async (event: any) => {
    event.preventDefault()
    setLoading(true)
    setError(false)
    setOutput("")
    setInput("")
    // alert(output)
    handleBusinessLogic()
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
          md={12}
          component={Paper}
          elevation={3}
          square
          style={{
            borderWidth: 1,
          }}
        >
          <OutputCard
            model={model}
            loading={loading}
            output={output}
            error={error}
            base={base}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card
              component="form"
              variant="elevation"
              elevation={1}
              noValidate
              sx={{
                mt: 0,
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                bottom: 0,
                mb: 0,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 0,
                paddingBottom: 2,
                borderRadius: 1,
                border: 1,
                borderColor: "transparent",
                width: "100vw",
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
                bottom: 60,
                right: 25,
                color: "white",
                margin: 1,
              }}
            >
              {mode ? (
                <DarkModeTwoToneIcon fontSize="small" color="warning" />
              ) : (
                <WbSunnyIcon fontSize="small" color="warning" />
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
