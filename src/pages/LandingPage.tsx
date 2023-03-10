import React, { useState } from "react"
import {
  Card,
  Paper,
  Box,
  Grid,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import { useAppDispatch } from "../redux/rtkHooks"
import { toggleTheme } from "../redux/themeSlice"
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone"
//cmp
import OutputCardV2 from "../components/OutputCardV2"
import PromptInput from "../components/PromptInput"
import PromptButton from "../components/PromptButton"
import TemporaryDrawer from "../components/TemporaryDrawer"

export default function LandingPage() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<any>("")
  const [base, setBase] = useState("")
  const [model, setModel] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [open, setOpen] = React.useState(false)
  const [mode, setMode] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  //#171718
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
      setBase(input)
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
    handleBusinessLogic()
  }

  const handleThemeChange = () => {
    dispatch(toggleTheme())
    setMode((mode) => !mode)
  }

  return (
    <React.Fragment>
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/* <Background /> */}
        <Grid
          item
          xs={true}
          sm={true}
          md={true}
          component={Paper}
          elevation={3}
          square
          style={{
            borderWidth: 1,
          }}
        >
          <TemporaryDrawer setInput={setInput} />
          <OutputCardV2
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
                // backgroundColor:'#202123'
              }}
            >
              <PromptInput handleChange={handleChange} input={input} />
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
                top: 1,
                right: 5,
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
          autoHideDuration={2000}
          onClose={handleClose}
          message="Success!"
          action={action}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Fetched data successfully!
          </Alert>
        </Snackbar>
      </Grid>
    </React.Fragment>
  )
}
