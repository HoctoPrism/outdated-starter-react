import React from "react";
import '../../App.css';
import {Box, Container, Typography} from "@mui/material";


function Home() {

    document.title = 'Page d\'accueil'

    return <Container maxWidth="lg">
        <Box>
            <Typography variant='h2'>Welcome</Typography>
            <Typography variant='h5'>REGLER LE SOUCIS DE FLASH BLANC LORS D'UN LOAD DE PAGE</Typography>
        </Box>
    </Container>
}


export default Home;