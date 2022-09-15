import '../styles/App.scss';

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import {lightTheme} from "./_partials/_theme/_lightTheme";
import {darkTheme} from "./_partials/_theme/_darkTheme";
import {ColorContext, setThemeToStorage} from "./_partials/_theme/_colorContext.ts";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";

import {Navbar} from "./_partials/_navbar/_navbar";
import {Footer} from "./_partials/_footer/_footer";
import {useEffect} from "react";

function App(props) {

    const { Component, pageProps } = props;

    React.useEffect(() => {
    }, []);

    function CustomTheme() {

        const [mode, setMode] = React.useState("light");
        const colorMode = React.useMemo(
            () => ({
                toggleColorMode: () => {
                    setMode((prevMode) =>
                        prevMode === "light" ? "dark" : "light"
                    );
                    setThemeToStorage();
                },
            }),
            []
        );
        const theme = React.useMemo(
        // @ts-ignore
            () => createTheme(mode === "light" ? lightTheme : darkTheme),
            [mode]
        );

        useEffect(() => {
            // rend le thème persistant après reload
            const mode = localStorage.getItem("isDarkMode");
            if (mode) {
                setMode(mode);
            }
        }, []);
        // @ts-ignore
        return <ColorContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme/>
                <Navbar/>
                <Container maxWidth="lg" className='main-container'>
                    <Component {...pageProps} />
                </Container>
                <Footer />
            </ThemeProvider>
        </ColorContext.Provider>
    }

    return <React.Fragment>
        <Head>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <CustomTheme/>
    </React.Fragment>

}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App
