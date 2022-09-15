import {AppBar, Box, Button} from "@mui/material";
import {SwitchModeButton} from "../_theme/_switchModeButton";
import {useEffect} from "react";
import Link from "next/link";
import {LogginButton} from "../../../services/auth/logginButton";

export function Navbar() {

    useEffect(() => {
    }, [])

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar className='header' id="navbar">
                <Box sx={{m: 5, flexGrow: 1}} component="div">React-Next-Starter</Box>
                <Box className="navbar">
                    <Link href='/'><Button color="secondary">Accueil</Button></Link>
                    {/*<Link href='type'><Button color="secondary">Type</Button></Link>*/}
                    <LogginButton/>
                    <SwitchModeButton/>
                </Box>
            </AppBar>
        </Box>
    )
}