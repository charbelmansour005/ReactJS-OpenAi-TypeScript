import { useRoutes } from "react-router-dom"
import OpenAI from "../pages/OpenAI"

// gives possiblity to switch routes on/off with api calls & great for big projects
export const Routes = () => {
  const role = localStorage.getItem("role")
  let element = useRoutes([
    { path: "/", element: <OpenAI /> },
    // { path: "/", element: role == "admin" ? <h1>admin</h1> : <OpenAI /> },
    { path: "*", element: <h1>Hmmm.. wrong page</h1> },
    { path: "/admin", element: <h1>ADMIN PAGE</h1> },
  ])
  return <>{element}</>
}
