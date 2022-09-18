import { useSession } from "next-auth/react"
import {Button} from "@mui/material";
import Logout from "../pages/logout";

export default function LoginBtn() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <Logout />
      </>
    )
  }
  return (
    <>
      <Button color="secondary" href="login">Connexion</Button>
    </>
  )
}