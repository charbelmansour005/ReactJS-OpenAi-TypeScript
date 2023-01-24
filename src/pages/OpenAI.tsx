import * as React from "react"
import { useEffect } from "react"
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
import { useNavigate, Link } from "react-router-dom"

const theme = createTheme()

export default function OpenAI() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

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
  const loadingTextChoices: string[] = [
    "Loading...",
    "Doing AI Stuff...",
    "Working...",
    "Fetching your result...",
  ]
  const randomLoadingText = loadingTextChoices[Math.floor(Math.random() * 4)]
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
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="prompt"
                label="Prompt"
                name="prompt"
                sx={{ backgroundColor: "#dbdbdb", width: 250 }}
                size="small"
                variant="standard"
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
                <Button
                  onClick={handleSubmit2}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  disabled={!input || loading}
                  size="small"
                  sx={{ mt: 1, mb: 1, width: "50%" }}
                >
                  {loading ? "Please wait..." : "Submit"}
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Card
              sx={{
                maxWidth: "90%",
                width: "90%",
                backgroundColor: "silver",
              }}
              variant="outlined"
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontWeight="300"
                >
                  {output.length && !loading ? "Results" : null}
                  {!output.length && loading ? LoadingText : null}
                  {!output.length && !loading ? "OpenAI" : null}
                </Typography>
                {error ? (
                  <Typography variant="body2" color="text.primary">
                    There was an error...
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.primary">
                    {output.length
                      ? output
                      : "Results will display here, give the prompt a sentence and OpenAI will finish it for you."}
                  </Typography>
                )}
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
