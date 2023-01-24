import * as React from "react"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState } from "react"
import { Player } from "@lottiefiles/react-lottie-player"
import { makeStyles } from "@mui/styles"
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Tooltip from "@mui/material/Tooltip"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import DarkModeIcon from "@mui/icons-material/DarkMode"

const theme = createTheme()

export default function OpenAI() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [open, setOpen] = React.useState(false)

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
    } catch (error: any) {
      setLoading(false)
      setError(true)
      console.error(error)
    }
  }

  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage:
              "url(https://images.prismic.io/contrary-research/409112a8-3782-431e-8061-51ce8326bc60_image+%2837%29.png)",
            // backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={7}
          component={Paper}
          elevation={3}
          square
          style={{
            backgroundColor: "#ffffff",
            borderWidth: 1,
            borderColor: "black",
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
            <Card
              sx={{
                maxWidth: "90%",
                width: "90%",
                backgroundColor: "#f7f7f8",
                borderColor: "transparent",
                // borderColor: "#c8c9d5",
              }}
              variant="outlined"
              elevation={0}
            >
              <CardContent>
                {output.length && !loading ? (
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontFamily="Inter"
                    fontWeight="bold"
                    fontSize={20}
                  >
                    OpenAI
                  </Typography>
                ) : null}
                {!output.length && loading ? (
                  <Player
                    src="https://assets8.lottiefiles.com/packages/lf20_4hyyiayl.json"
                    loop
                    style={{ height: 100, width: 100 }}
                    speed={1}
                    direction={1}
                    autoplay
                  />
                ) : null}
                {!output.length && !loading ? (
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontWeight="bold"
                    fontSize={20}
                    fontFamily="Inter"
                  >
                    OpenAI
                  </Typography>
                ) : null}
                <Divider textAlign="center"></Divider>
                <Box sx={{ mt: 2 }}>
                  {error ? (
                    <Typography
                      variant="body2"
                      color="text.primary"
                      fontFamily="Inter"
                    >
                      There was an error...
                    </Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.primary"
                      fontFamily="Inter"
                    >
                      {output.length && !loading
                        ? output
                        : `Give me a prompt and let me do the
                          rest.`}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              sx={{
                mt: 0,
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                bottom: 0,
                mb: 3,
                backgroundColor: "#f7f7f8",
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 1,
                paddingBottom: 2,
                borderRadius: 1,
                border: 1,
                borderColor: "#c8c9d5",
                width: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="prompt"
                multiline={true}
                rows={4}
                placeholder="One of the many reasons I prefer driving a Tesla is that"
                name="prompt"
                sx={{
                  backgroundColor: "#f7f7f8",
                  width: 470,
                  mb: 2,
                  fontFamily: "Inter",
                }}
                color="warning"
                size="small"
                variant="outlined"
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
            </Box>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 0,
                left: 1,
                color: "white",
                margin: 1,
              }}
            >
              <DarkModeIcon fontSize="small" />
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
    </ThemeProvider>
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
    borderColor: "orange",
  },
})
