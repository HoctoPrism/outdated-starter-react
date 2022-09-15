import React from "react";
import {Box, Container, Typography} from "@mui/material";
import defineTitle from "../services/defineTitle";

function Home() {

    defineTitle('Home');

    return <Container id='home'>
        <Box>
            <Typography variant='h2'>Welcome</Typography>
            <Typography variant='h5'>REGLER LE SOUCIS DE FLASH BLANC LORS D'UN LOAD DE PAGE</Typography>
            <Typography variant='h5'>REGLER LE SOUCIS DE PERF LIE A NEXT</Typography>
        </Box>
    </Container>
}

export default Home;