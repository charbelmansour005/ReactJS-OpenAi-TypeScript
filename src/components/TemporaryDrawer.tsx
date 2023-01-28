import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ShuffleIcon from "@mui/icons-material/Shuffle"
import { IconButton } from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

interface Props {
  setInput: (args?: any) => void
}

type Anchor = "top" | "left" | "bottom" | "right"

export default function TemporaryDrawer({ ...props }: Props) {
  const [open, setOpen] = React.useState(false)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
    }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClickOpen}>
            <ListItemIcon>
              <ShuffleIcon />
            </ListItemIcon>
            <ListItemText primary="Sample queries" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  )

  interface suggestions {
    suggestion1: string
    suggestion2: string
    suggestion3: string
  }

  const suggestions: suggestions = {
    suggestion1: "How do you make a chocolate cake?",
    suggestion2: "Who wrote the novel 'Pride and Prejudice'?",
    suggestion3: "Who painted the Mona Lisa?",
  }

  const handleSuggestion1 = () => {
    props.setInput(suggestions.suggestion1)
    handleClose()
  }
  const handleSuggestion2 = () => {
    props.setInput(suggestions.suggestion2)
    handleClose()
  }
  const handleSuggestion3 = () => {
    props.setInput(suggestions.suggestion3)
    handleClose()
  }

  return (
    <div>
      <React.Fragment>
        <IconButton
          sx={{ position: "absolute", top: 1, left: 5, m: 0.2 }}
          onClick={toggleDrawer("left", true)}
        >
          <NavigateNextIcon fontSize="small" />
        </IconButton>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              fontSize: 15,
              textAlign: "start",
            }}
          >
            {"Test Your Knowledge with OpenAI GPT-3"}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Button onClick={handleSuggestion1}>
              <DialogContentText
                id="alert-dialog-description"
                sx={{ fontSize: 15, textTransform: "none" }}
              >
                {suggestions.suggestion1}
              </DialogContentText>
            </Button>
            <Divider />
            <Button onClick={handleSuggestion2}>
              <DialogContentText
                id="alert-dialog-description"
                sx={{ fontSize: 15, textTransform: "none" }}
              >
                {suggestions.suggestion2}
              </DialogContentText>
            </Button>
            <Divider />
            <Button onClick={handleSuggestion3}>
              <DialogContentText
                id="alert-dialog-description"
                sx={{ fontSize: 15, textTransform: "none" }}
              >
                {suggestions.suggestion3}
              </DialogContentText>
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
