import { Card } from "@mui/material"
import React from "react"

type Props = {
  children?: React.ReactNode
}

const CapabilitiesCard = ({ children }: Props): JSX.Element => {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        width: 150,
        height: "100%",
        padding: 2,
        justifyContent: "center",
        alignItems: "center",
        marginX: 1,
      }}
      variant="elevation"
      elevation={0}
    >
      {children}
    </Card>
  )
}

export default CapabilitiesCard
