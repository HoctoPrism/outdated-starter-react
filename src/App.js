import './App.css';
import React from "react";
import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";
function App() {

    document.title = "Accueil"
    
    return <Container maxWidth="xl" sx={{mt: 25}}>
        <Outlet/>
    </Container>

}

export default App;
