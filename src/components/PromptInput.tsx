import React from "react"
import { makeStyles } from "@mui/styles"
import { TextField } from "@mui/material"

type Props = {
  handleChange: (args?: any) => void
}

function PromptInput({ ...props }: Props) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <TextField
        className={classes.rootInput}
        margin="normal"
        fullWidth
        id="prompt"
        multiline={true}
        rows={4}
        placeholder="One of the many reasons I prefer driving a Tesla is that"
        name="prompt"
        sx={{
          width: 380,
          mb: 2,
          fontFamily: "Inter",
          fontSize: "14px",
        }}
        color="warning"
        size="small"
        variant="filled"
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
