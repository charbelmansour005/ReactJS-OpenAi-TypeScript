import { Typography } from "@mui/material"
import React from "react"

type Props = {
  children?: React.ReactNode
}

const CapabilitiesTypography = ({ children }: Props): JSX.Element => {
  return (
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
      {children}
    </Typography>
  )
}

export default CapabilitiesTypography
