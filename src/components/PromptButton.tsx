import React from "react"
import { makeStyles } from "@mui/styles"
import { Box, Tooltip, Button } from "@mui/material"

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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Tooltip
          title={!props.input ? `Write something first` : `Generate completion`}
          placement="right"
        >
          <span>
            <Button
              onClick={props.handleSubmit2}
              fullWidth
              variant="contained"
              disableElevation
              disabled={!props.input || props.loading}
              size="small"
              sx={{
                width: "30%",
                textTransform: "capitalize",
                fontSize: 14,
              }}
              className={classes.root}
            >
              Submit
            </Button>
          </span>
        </Tooltip>
      </Box>
    </React.Fragment>
  )
}

export default PromptButton

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#fff",
    },
  },
})
