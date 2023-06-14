import {AppBar, Box, Button} from "@mui/material";
import {SwitchModeButton} from "../../../services/theme/switchModeButton";
import {useEffect} from "react";
import Link from "next/link";
import LoginBtn from "../../../components/login-btn";
import {useSession} from "next-auth/react";

export default function Navbar() {

    const { data: session, status } = useSession();

    useEffect(() => {
    }, [])

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar className='header' id="navbar">
                <Box sx={{m: 5, flexGrow: 1}} component="div">React-Next-Starter</Box>
                <Box className="navbar">
                    <Link href='/'><Button color="secondary">Accueil</Button></Link>
                    {session && session?.user?.role === "ROLE_ADMIN" ? (
                        <Link href='/type'><Button color="secondary">Type</Button></Link>
                    ) : null}
                    <LoginBtn/>
                    <SwitchModeButton/>
                </Box>
            </AppBar>
        </Box>
    )
}