import '../styles/App.scss';

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import {lightTheme} from "../services/theme/lightTheme";
import {darkTheme} from "../services/theme/darkTheme";
import {ColorContext, setThemeToStorage} from "../services/theme/colorContext.ts";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";

import Navbar from "./_partials/_navbar/_navbar";
import Footer from "./_partials/_footer/_footer";
import {useEffect} from "react";
import Axios from "axios";

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

function App(props) {

    const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
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
