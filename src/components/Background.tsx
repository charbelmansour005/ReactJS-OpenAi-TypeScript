import { Button, Card } from "@mui/material"
import Grid from "@mui/material/Grid"

type Props = {}

function Background({}: Props) {
  return (
    <Grid
      item
      // xs={false}
      sm={0}
      // md={5}
      sx={{
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "green",
        overflow: "hidden",
      }}
    ></Grid>
  )
}

export default Background
