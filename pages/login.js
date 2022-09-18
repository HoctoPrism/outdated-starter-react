import {getCsrfToken, signIn, useSession} from "next-auth/react"
import React, {useState} from 'react';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import defineTitle from "../services/defineTitle";
import {useRouter} from "next/router";

export default function Login({csrfToken = getCsrfToken()}) {

    const {data: session, status} = useSession();

    defineTitle('Connexion');

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const router = useRouter()

    if (status === "authenticated" && session) {
        return router.back()
    }

    const handleClickShowPassword = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    let login = async (e) => {
        e.preventDefault();
        try {
            const {ok, error, url, status} = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
                callbackUrl: `${window.location.origin}/`,
            });

            if (ok) {
                setToastMessage({message: "Vous êtes connecté !", severity: "success"});
                setShowToast(true);
                router.back()
            }
            if (error) {
                setToastMessage({message: "Identifiants incorrects", severity: "error"});
                setShowToast(true);
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Box>
            <Typography variant="h1" sx={{fontSize: "55px", textAlign: "center"}}>
                Connexion
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexColumn: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 5
                }}
            >
                <Button href="/register" variant="contained">
                    Créer un compte
                </Button>
            </Box>
            <form onSubmit={(e) => login(e)}>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
                <Grid
                    container
                    spacing={12}
                    sx={{alignItems: "center", justifyContent: "center"}}
                >
                    <Grid item sx={{maxWidth: "400px"}}>
                        <TextField
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{mt: 5, height: 50}}
                            label="Email"
                            variant="standard"
                            value={email}
                            fullWidth
                        />

                        <FormControl fullWidth sx={{mt: 5, height: 50}}>
                            <InputLabel htmlFor="password" sx={{left: "-15px"}}>
                                Password
                            </InputLabel>
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                variant="standard"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment
                                        position="end"
                                        sx={{color: "inherit"}}
                                    >
                                        <IconButton
                                            color="inherit"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={(e) => e.preventDefault()}
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            minWidth: "100%",
                            display: "flex",
                            flexColumn: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Button variant="contained" type="submit" sx={{m: 8}}>
                            Connexion
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar
                open={toast}
                autoHideDuration={3000}
                onClose={() => setShowToast(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={() => setShowToast(false)} severity={toastMessage.severity} sx={{width: '100%'}}>
                    {toastMessage.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
