import { Player } from "@lottiefiles/react-lottie-player"
import { Box, CardContent, Typography, Card, Divider } from "@mui/material"
import { randomLoadingText } from "../helpers/loading"

type Props = {
  output: string
  loading: boolean
  error: boolean
}

function OutputCard({ ...props }: Props) {
  return (
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
                fontSize={14}
              >
                {/* {props.output.length && !props.loading
                  ? props.output
                  : `Give me a prompt and let me do the
              rest.`} */}
                {!props.output &&
                  !props.loading &&
                  !props.error &&
                  `Give me a prompt and let me do the
              rest.`}
                {!props.output.length && props.loading
                  ? randomLoadingText
                  : props.output}
              </Typography>
              //  iza mafi text
              // w iza mech loading
              // show Give me a prompt and let me do the rest
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default OutputCard
