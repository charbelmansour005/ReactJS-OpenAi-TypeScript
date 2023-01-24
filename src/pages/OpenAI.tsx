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
import { randomLoadingText } from "../helpers/loading"
import Chip from "@mui/material/Chip"
import { Player } from "@lottiefiles/react-lottie-player"

const theme = createTheme()

export default function OpenAI() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

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
    } catch (error: any) {
      setLoading(false)
      setError(true)
      console.error(error)
    }
  }

  const LoadingText: string = randomLoadingText

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
            backgroundImage: "url(https://source.unsplash.com/random)",
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
            backgroundColor: "#dcdcdc",
            borderWidth: 1,
            borderColor: "black",
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              mt: 5,
            }}
          >
            <Card
              sx={{
                maxWidth: "90%",
                width: "90%",
                backgroundColor: "silver",
              }}
              variant="outlined"
              elevation={0}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontWeight="300"
                >
                  {output.length && !loading ? "OpenAI" : null}
                  {!output.length && loading ? (
                    <Player
                      src="https://assets7.lottiefiles.com/private_files/lf30_ypgvza1p.json"
                      loop
                      style={{ height: 80, width: 80 }}
                      speed={1}
                      direction={1}
                      // background="transparent"
                      autoplay
                    />
                  ) : null}
                  {/* {!output.length && loading ? LoadingText : null} */}
                  {!output.length && !loading ? "OpenAI" : null}
                </Typography>
                <Divider textAlign="center">
                  {output.length && !loading ? (
                    <Chip
                      variant="outlined"
                      color="primary"
                      label="Output"
                      sx={{ fontWeight: "bold", color: "black" }}
                    />
                  ) : null}
                </Divider>
                <Box sx={{ mt: 2 }}>
                  {error ? (
                    <Typography variant="body2" color="text.primary">
                      There was an error...
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="text.primary">
                      {output.length ? (
                        output
                      ) : (
                        <p>
                          Give me a <strong>prompt</strong> and let me do the
                          rest.
                        </p>
                      )}
                    </Typography>
                  )}
                </Box>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </Box>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
                bottom: 0,
                mb: 5,
                backgroundColor: "silver",
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 1,
                paddingBottom: 2,
                borderRadius: 1,
                border: 1,
                borderColor: "darkgray",
              }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="prompt"
                label="Prompt"
                name="prompt"
                sx={{ backgroundColor: "silver", width: "100%", mb: 3 }}
                size="small"
                variant="outlined"
                onChange={handleChange}
                autoComplete="off"
              />
              {/* <Divider sx={{ mb: 2 }}></Divider> */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={handleSubmit2}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  disabled={!input || loading}
                  size="small"
                  sx={{ mt: 1, mb: 1, width: "50%" }}
                >
                  {loading ? "Loading" : "Submit"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
