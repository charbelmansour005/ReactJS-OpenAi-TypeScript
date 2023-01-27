import React from "react"
import { Box, Tooltip, IconButton } from "@mui/material"
import SendSharpIcon from "@mui/icons-material/SendSharp"
import ButtonLoading from "./Animations/ButtonLoading"

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
          title={
            !props.input && !props.loading
              ? `Write something first`
              : `Generate completion`
          }
          placement="right"
        >
          <span>
            {props.loading ? (
              <ButtonLoading />
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
