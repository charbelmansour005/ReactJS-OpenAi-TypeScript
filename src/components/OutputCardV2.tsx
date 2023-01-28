import { Box, CardContent, Typography, Card, Divider } from "@mui/material"
import { randomLoadingText } from "../helpers/loading"
import UITypography from "./UI/UITypography"
import CapabilitiesTypography from "./UI/CapabilitiesTypography"
import CapabilitiesCard from "./UI/CapabilitiesCard"
import ElectricBoltTwoTone from "@mui/icons-material/ElectricBoltTwoTone"

type Props = {
  output: any
  loading: boolean
  error: boolean
  model: string
  base: string
}

function OutputCardV2({ ...props }: Props) {
  const imageURL =
    "https://brandlogovector.com/wp-content/uploads/2023/01/ChatGPT-Icon-Logo-PNG.png"
  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        ml: 10,
        mr: 10,
        mt: 5,
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
          variant="elevation"
          elevation={3}
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
      {props.base && (
        <Card
          sx={{
            maxWidth: "100%",
            width: "100%",
            height: "100%",
            padding: 0,
          }}
          variant="outlined"
          elevation={3}
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
                      <Divider
                        sx={{ mb: 2, mt: 2 }}
                        textAlign="center"
                      ></Divider>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <img
                          style={{
                            height: 30,
                            width: 30,
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
                          {randomLoadingText}
                        </Typography>
                      </div>
                    </>
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
                            sx={{
                              mb: 2,
                              mt: 2,
                            }}
                            textAlign="center"
                          ></Divider>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <img
                              style={{
                                height: 30,
                                width: 30,
                                borderRadius: 2,
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
                                mt: 0.8,
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
      {/* at initial load */}
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

export default OutputCardV2
