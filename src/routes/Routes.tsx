import { useRoutes } from "react-router-dom"
import LandingPage from "../pages/LandingPage"

export const Routes = () => {
  let element = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "*", element: <h1>Hmmm.. wrong page</h1> },
  ])
  return <>{element}</>
}
