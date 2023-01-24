import { useRoutes } from "react-router-dom"
import OpenAI from "../pages/OpenAI"

// gives possiblity to switch routes on/off with api calls & great for big projects
export const Routes = () => {
  let element = useRoutes([
    { path: "/", element: <OpenAI /> },
    { path: "*", element: <h1>Hmmm.. wrong page</h1> },
  ])
  return <>{element}</>
}
