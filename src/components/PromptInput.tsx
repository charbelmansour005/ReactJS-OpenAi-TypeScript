import React from "react"
import { makeStyles } from "@mui/styles"
import { TextField } from "@mui/material"

type Props = {
  handleChange: (args?: any) => void
  input: string
}

function PromptInput({ ...props }: Props) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <TextField
        className={classes.rootInput}
        margin="normal"
        fullWidth
        // label="prompt"
        id="prompt"
        multiline={true}
        value={props.input}
        rows={3}
        placeholder="Enter your request here"
        name="prompt"
        sx={{
          width: "100%",
          mb: 2,
          fontFamily: "Inter",
          fontSize: "14px",
        }}
        color="warning"
        size="small"
        variant="outlined"
        onChange={props.handleChange}
        autoComplete="off"
      />
    </React.Fragment>
  )
}

export default PromptInput

const useStyles = makeStyles({
  rootInput: {
    underline: {
      "&:hover:not($disabled):before": {
        backgroundColor: "transparent",
        height: 1,
      },
    },
  },
})
