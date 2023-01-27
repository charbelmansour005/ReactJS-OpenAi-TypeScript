import React from "react"
import { Box, Tooltip, IconButton } from "@mui/material"
import SendSharpIcon from "@mui/icons-material/SendSharp"
import { Player } from "@lottiefiles/react-lottie-player"

type Props = {
  input: string
  loading: boolean
  handleSubmit2: (args?: any) => void
}
const PromptButton = ({ ...props }: Props) => {
  return (
    <React.Fragment>
      <Box
        sx={{
          position: "absolute",
          bottom: 35,
          right: 30,
        }}
      >
        <Tooltip
          title={!props.input ? `Write something first` : `Generate completion`}
          placement="right"
        >
          <span>
            {props.loading ? (
              <Player
                src="https://assets8.lottiefiles.com/packages/lf20_n20gxdab.json"
                loop
                style={{ height: 20, width: 25 }}
                speed={1}
                direction={1}
                autoplay
              />
            ) : (
              <IconButton
                onClick={props.handleSubmit2}
                disabled={!props.input || props.loading}
                size="small"
                sx={{
                  width: 30,
                  borderRadius: 1,
                  height: 25,
                }}
              >
                <SendSharpIcon fontSize="small" />
              </IconButton>
            )}
          </span>
        </Tooltip>
      </Box>
    </React.Fragment>
  )
}

export default PromptButton
