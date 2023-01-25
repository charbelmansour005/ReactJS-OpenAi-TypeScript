import { Player } from "@lottiefiles/react-lottie-player"
import { Box, CardContent, Typography, Card, Divider } from "@mui/material"

type Props = {
  output: string
  loading: boolean
  error: boolean
}

function OutputCard({ ...props }: Props) {
  return (
    <Card
      sx={{
        maxWidth: "90%",
        width: "90%",
        // backgroundColor: "#f7f7f8",
        // borderColor: "transparent",
        // borderColor: "#c8c9d5",
      }}
      variant="outlined"
      elevation={0}
    >
      <CardContent>
        {props.output.length && !props.loading ? (
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
        {!props.output.length && props.loading ? (
          <Player
            src="https://assets8.lottiefiles.com/packages/lf20_4hyyiayl.json"
            loop
            style={{ height: 100, width: 100 }}
            speed={1}
            direction={1}
            autoplay
          />
        ) : null}
        {!props.output.length && !props.loading ? (
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
          {props.error ? (
            <Typography variant="body2" color="text.primary" fontFamily="Inter">
              There was an error...
            </Typography>
          ) : (
            <Typography variant="body2" color="text.primary" fontFamily="Inter">
              {props.output.length && !props.loading
                ? props.output
                : `Give me a prompt and let me do the
              rest.`}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default OutputCard
