import {AppBar, Box, Link} from "@mui/material";
import {useEffect} from "react";

export default function Footer() {

    useEffect(() => {
    }, [])

    return (
         <AppBar component='div' id="footer" position="fixed" className='footer-container' sx={{ top: 'auto', bottom: 0, minHeight: "50px", backgroundColor: "primary.main" }}>
             <Box>
                 Developped by <Link
                     href="https://github.com/HoctoPrism"
                     underline='none'
                     rel="noopener"
                     target="_blank"
                     sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}
                 >
                     @HoctoPrism
                 </Link> on GitHub
             </Box>
         </AppBar>

    )
}