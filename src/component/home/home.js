import React from "react";
import {Box, Container, Typography} from "@mui/material";
import AdminMessage from "../../services/auth/adminMessage";


function Home(props) {

    document.title = 'Page d\'accueil'

    return <Container maxWidth="lg" id='home'>
        <Box>
            <Typography variant='h2'>Welcome</Typography>
            <Typography variant='h5'>REGLER LE SOUCIS DE FLASH BLANC LORS D'UN LOAD DE PAGE</Typography>
        </Box>
        {props.adminMessage ? (
            <AdminMessage adminMessage={props.adminMessage}/>
        ) : null}
    </Container>
}


export default Home;