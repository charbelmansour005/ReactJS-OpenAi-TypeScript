import { Player } from "@lottiefiles/react-lottie-player"
import { Box, CardContent, Typography, Card, Divider } from "@mui/material"
import { randomLoadingText } from "../helpers/loading"
import UITypography from "./UITypography"
import CapabilitiesTypography from "./CapabilitiesTypography"
import CapabilitiesCard from "./CapabilitiesCard"
import ElectricBoltTwoTone from "@mui/icons-material/ElectricBoltTwoTone"

type Props = {
  output: any
  loading: boolean
  error: boolean
  model: string
  base: string
}

function OutputCard({ ...props }: Props) {
  const imageURL =
    "https://brandlogovector.com/wp-content/uploads/2023/01/ChatGPT-Icon-Logo-PNG.png"
  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        m: 1,
      }}
    >
      <Card
        sx={{
          maxWidth: "100%",
          width: "100%",
          height: "100%",
          padding: 0,
        }}
        variant="outlined"
        elevation={0}
      >
        <CardContent>
          {props.output.length && !props.loading ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 3,
                  marginRight: 15,
                }}
                src={imageURL}
              />
              <UITypography>
                {props.model ? props.model : `davinci`}
              </UITypography>
            </div>
          ) : null}
          {!props.output.length && props.loading ? (
            <Player
              src="https://assets3.lottiefiles.com/packages/lf20_E5C0kC.json"
              loop
              style={{ height: 100, width: 100 }}
              speed={1}
              direction={1}
              autoplay
            />
          ) : null}
          {!props.output.length && !props.loading ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 3,
                  marginRight: 15,
                }}
                src={imageURL}
              />
              <UITypography>OpenAI</UITypography>
            </div>
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
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  overflowWrap: "break-word",
                }}
              >
                {!props.output &&
                  !props.loading &&
                  !props.error &&
                  `Unlock endless possibilities with the powerful OpenAI Davinci Engine language model`}
                {!props.output.length && props.loading
                  ? randomLoadingText
                  : props.base + props.output}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
      {!props.output && !props.loading && (
        <>
          <Box
            sx={{
              mt: "5%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ElectricBoltTwoTone
              sx={{ alignItems: "center", justifyContent: "center", mb: 1 }}
              fontSize="small"
            />
            <UITypography>Capabilities</UITypography>
          </Box>
          <Box
            sx={{
              maxWidth: "100%",
              width: "100%",
              height: "100%",

              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <CapabilitiesCard>
              <CapabilitiesTypography>
                Text generation for card captions or descriptions.
              </CapabilitiesTypography>
            </CapabilitiesCard>
            <CapabilitiesCard>
              <CapabilitiesTypography>
                Image captioning for descriptive alt text.
              </CapabilitiesTypography>
            </CapabilitiesCard>
            <CapabilitiesCard>
              <CapabilitiesTypography>
                Text summarization for concise summaries on a card.
              </CapabilitiesTypography>
            </CapabilitiesCard>
          </Box>
        </>
      )}
    </Box>
  )
}

export default OutputCard
