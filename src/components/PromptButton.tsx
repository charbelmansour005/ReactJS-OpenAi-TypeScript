import React from "react"
import { makeStyles } from "@mui/styles"
import { Box, Tooltip, Button, IconButton } from "@mui/material"
import SendSharpIcon from "@mui/icons-material/SendSharp"

type Props = {
  input: string
  loading: boolean
  handleSubmit2: (args?: any) => void
}

const PromptButton = ({ ...props }: Props) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Box
        sx={{
          position: "absolute",
          bottom: 35,
          right: 30,
          // alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <Tooltip
          title={!props.input ? `Write something first` : `Generate completion`}
          placement="right"
        >
          <span>
            <IconButton
              onClick={props.handleSubmit2}
              // fullWidth
              // variant="contained"
              // disableElevation
              disabled={!props.input || props.loading}
              size="small"
              sx={{
                width: 30,
                borderRadius: 1,
                height: 25,
              }}
              // className={classes.root}
            >
              <SendSharpIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </React.Fragment>
  )
}

export default PromptButton

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #24a37f 30%, #24a37f 90%)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#fff",
    },
  },
})
