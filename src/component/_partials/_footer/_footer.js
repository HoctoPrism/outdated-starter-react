import {AppBar, Box, Button} from "@mui/material";
import {SwitchModeButton} from "../_theme/_switchModeButton";
import {useEffect} from "react";

export function Navbar() {

    useEffect(() => {
    }, [])

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar className='header'>
                <Box sx={{m: 5, flexGrow: 1}} component="div">{document.title}</Box>
                <Box sx={{display: 'flex', justifyContent: "flex-end", alignItems: "center"}}>
                    <Button color="secondary" href='/'>Accueil</Button>
                    <SwitchModeButton/>
                </Box>
            </AppBar>
        </Box>
    )
}