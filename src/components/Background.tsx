import Grid from "@mui/material/Grid"

type Props = {}

function Background({}: Props) {
  return (
    <>
      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        sx={{
          backgroundImage:
            "url(https://images.prismic.io/contrary-research/409112a8-3782-431e-8061-51ce8326bc60_image+%2837%29.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "green",
          overflow: "hidden",
        }}
      />
    </>
  )
}

export default Background
