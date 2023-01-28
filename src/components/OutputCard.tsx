import { Player } from "@lottiefiles/react-lottie-player"
import { Box, CardContent, Typography, Card, Divider } from "@mui/material"
import { randomLoadingText } from "../helpers/loading"
import UITypography from "./UI/UITypography"
import CapabilitiesTypography from "./UI/CapabilitiesTypography"
import CapabilitiesCard from "./UI/CapabilitiesCard"
import ElectricBoltTwoTone from "@mui/icons-material/ElectricBoltTwoTone"
import CardLoading from "./Animations/CardLoading"

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
        m: 2,
      }}
    >
      {props.error && (
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
            <Box sx={{ mt: 1 }}>
              <CapabilitiesTypography>
                There was an error...
              </CapabilitiesTypography>
            </Box>
          </CardContent>
        </Card>
      )}
      {props.loading && (
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
            <Box sx={{ mt: 1 }}>
              <CapabilitiesTypography>
                {randomLoadingText}
              </CapabilitiesTypography>
            </Box>
          </CardContent>
        </Card>
      )}
      {props.output && (
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
            <Box sx={{ mt: 1 }}>
              {props.error ? (
                <Typography
                  variant="body2"
                  color="text.primary"
                  fontFamily="Inter"
                >
                  There was an error...
                </Typography>
              ) : (
                <>
                  {!props.output.length && props.loading ? (
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
                      {randomLoadingText}
                    </Typography>
                  ) : (
                    <>
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
                        {props.base}
                      </Typography>
                      {props.output && (
                        <>
                          <Divider
                            sx={{ mb: 2, mt: 2 }}
                            textAlign="center"
                          ></Divider>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <img
                              style={{
                                height: 25,
                                width: 25,
                                borderRadius: 3,
                                marginRight: 15,
                              }}
                              src={imageURL}
                            />
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
                              {props.output}
                            </Typography>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      )}
      {!props.output && !props.loading && (
        <>
          <Box
            sx={{
              mt: "1%",
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
