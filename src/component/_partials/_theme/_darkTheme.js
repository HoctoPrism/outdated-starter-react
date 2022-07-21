/*export const darkPalette = {
    50: '#faecec',
    100: '#f4d0d0',
    200: '#ecb0b0',
    300: '#e49090',
    400: '#df7979',
    500: '#d96161',
    600: '#d55959',
    700: '#cf4f4f',
    800: '#ca4545',
    900: '#c03333',
    A100: '#ffffff',
    A200: '#ffd4d4',
    A400: '#ffa1a1',
    A700: '#ff8888',
    'contrastDefaultColor': 'dark',
};*/

export const darkTheme = {
    palette: {
        type: 'dark',
        primary: {
            main: '#d96161',
            light: 'rgb(224, 128, 128)',
            dark: 'rgb(151, 67, 67)',
            contrastText: '#fff',
        },
        secondary: {
            main: '#f4cfd5',
            light: 'rgb(246, 216, 221)',
            dark: 'rgb(170, 144, 149)',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        warning: {
            main: '#ff9800',
            light: 'rgb(255, 172, 51)',
            dark: 'rgb(178, 106, 0)',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        info: {
            main: '#2196f3',
            light: 'rgb(77, 171, 245)',
            dark: 'rgb(23, 105, 170)',
            contrastText: '#fff',
        },
        success: {
            main: '#4caf50',
            light: 'rgb(111, 191, 115)',
            dark: 'rgb(53, 122, 56)',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        grey: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
            A100: '#f5f5f5',
            A200: '#eeeeee',
            A400: '#bdbdbd',
            A700: '#616161'
        },
        divider: 'rgba(255, 255, 255, 0.12)',
        background: {
            default: '#242c2f',
            paper: '#394248',
        },
        text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
            hint: 'rgba(255, 255, 255, 0.5)',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    spacing: 4,
    shape: {
        borderRadius: 4
    },
    mixins: {
        minHeight: 56
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        htmlFontSize: 16,
    },
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    "&:before": {
                        borderColor: '#c4c6c8'
                    }
                }
            }
        }
    }
};