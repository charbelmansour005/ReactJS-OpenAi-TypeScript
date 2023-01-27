import React from "react"
import { Typography } from "@mui/material"

type Props = {
  children?: React.ReactNode
}

const UITypography = ({ children }: Props): JSX.Element => {
  return (
    <Typography
      gutterBottom
      variant="h5"
      component="div"
      fontFamily="Inter"
      fontWeight="bold"
      fontSize={20}
      sx={{
        mb: 2,
      }}
    >
      {children}
    </Typography>
  )
}

export default UITypography
