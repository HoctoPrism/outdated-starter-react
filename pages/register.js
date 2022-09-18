import {useEffect, useRef, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {
    Alert,
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import axios from "axios";
import defineTitle from "../services/defineTitle";
import {useRouter} from "next/router";
import {signIn} from "next-auth/react";

function Register() {

    defineTitle('Inscription au site');

    const {register, watch, control, handleSubmit, formState: {errors, isDirty, isValid}} = useForm({mode: "onChange"});

    const email = watch('email', "");
    const password = watch('password', "");
    const username = watch('username', "");
    const lastname = watch('lastname', "");
    const firstname = watch('firstname', "");

    const [showPassword, setShowPassword] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const [errMessage, setErrMessage] = useState("");
    const onSubmit = e => registerForm();
    const router = useRouter();

    const min = useRef()
    const max = useRef()
    const num = useRef()
    const spec = useRef()

    const minuscule = '(?=.*[a-z])'; // toutes les minuscules
    const majuscule = '(?=.*[A-Z])'; // toutes les majuscules
    const number = '(?=.*[0-9])'; // les nombres
    const special = '(?=.*[!@#:$%^&])'; // caracteres

    useEffect(() => {
        // Check if password contains a lowercase
        if (password.match(minuscule)) {
            min.current.style.backgroundColor = "#4F9747"; // if yes, bg green
        } else {
            min.current.style.backgroundColor = "#ce0033"; // if not, bg red
        }

        // Check if password contains a uppercase
        if (password.match(majuscule)) {
            max.current.style.backgroundColor = "#4F9747"; // if yes, bg green
        } else {
            max.current.style.backgroundColor = "#ce0033"; // if not, bg red
        }

        // Check if password contains a number
        if (password.match(number)) {
            num.current.style.backgroundColor = "#4F9747"; // if yes, bg green
        } else {
            num.current.style.backgroundColor = "#ce0033"; // if not, bg red
        }

        // Check if password contains a special character
        if (password.match(special)) {
            spec.current.style.backgroundColor = "#4F9747"; // if yes, bg green
        } else {
            spec.current.style.backgroundColor = "#ce0033"; // if not, bg red
        }

    }, [password])

    let registerForm = async () => {
        setErrMessage('')
        try {
            let formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("username", username);
            formData.append("lastname", lastname);
            formData.append("firstname", firstname);

            let res = await axios.post('http://127.0.0.1:8000/api/register/', formData, {
                "headers": {"Content-Type": "multipart/form-data"}
            });
            if (res.status === 200) {
                setErrMessage('')
                const {ok, error, url, status} = await signIn("credentials", {
                    redirect: false,
                    email: email,
                    password: password,
                    callbackUrl: `${window.location.origin}/`,
                });
                if (ok) {
                    setToastMessage({message: "Vous êtes enregistré et vous allez être redirigé", severity: "success"});
                    setShowToast(true);
                    setTimeout(async () => {
                        await router.push(url);
                    }, 2000)

                }
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
                setShowToast(true);
            }
        } catch (err) {
            let errors = err.response.data;
            if (errors.errors){
                for (const [key, value] of Object.entries(errors.errors)) {
                    setToastMessage({message: value, severity: "error"});
                    setShowToast(true);
                }
            } else if (errors.message){
                setToastMessage({message: errors.message, severity: "error"});
                setShowToast(true);
            }
        }
    }

    const handleClickShowPassword = () => {
        if (!showPassword) {
            setShowPassword(true)
        } else {
            setShowPassword(false)
        }
    };

    return <Box>
        <Typography variant='h1' sx={{fontSize: "55px", textAlign: "center", mb: 5}}>Inscription</Typography>
        <Box sx={{display: "flex", flexColumn: "row", alignItems: "center", justifyContent: "center"}}><Button
            variant="contained" href='signin'>Connexion</Button></Box>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => e.key === 'Enter' ? handleSubmit(onSubmit) : null}>
            <Grid container spacing={12} sx={{alignItems: 'center', justifyContent: 'center'}}>
                <Grid item sx={{maxWidth: '400px'}}>
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        render={() => (
                            <TextField
                                {...register(
                                    'username', {
                                        required: 'Veuillez saisir un username',
                                    }
                                )}
                                sx={{mt: 5, height: 50}}
                                label="Username"
                                variant="standard"
                                value={username}
                                fullWidth
                            />
                        )}
                    />
                    {errors.username ? (
                        <Alert sx={{mt: 2, p: 0, pl: 2}} severity="error">{errors.username?.message}</Alert>
                    ) : ''}
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={() => (
                            <TextField
                                {...register(
                                    'email', {
                                        required: 'Veuillez saisir un email',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Veuillez saisir un email valide"
                                        }
                                    }
                                )}
                                sx={{mt: 5, height: 50}}
                                label="Email"
                                variant="standard"
                                value={email}
                                fullWidth
                            />
                        )}
                    />
                    {errors.email ? (
                        <Alert sx={{mt: 2, p: 0, pl: 2}} severity="error">{errors.email?.message}</Alert>
                    ) : ''}
                    <Controller
                        name="firstname"
                        control={control}
                        defaultValue=""
                        render={() => (
                            <TextField
                                {...register(
                                    'firstname', {
                                        required: 'Veuillez saisir un prénom',
                                    }
                                )}
                                sx={{mt: 5, height: 50}}
                                label="Prénom"
                                variant="standard"
                                value={firstname}
                                fullWidth
                            />
                        )}
                    />
                    {errors.firstname ? (
                        <Alert sx={{mt: 2, p: 0, pl: 2}} severity="error">{errors.firstname?.message}</Alert>
                    ) : ''}
                    <Controller
                        name="lastname"
                        control={control}
                        defaultValue=""
                        render={() => (
                            <TextField
                                {...register(
                                    'lastname', {
                                        required: 'Veuillez saisir un nom',
                                    }
                                )}
                                sx={{mt: 5, height: 50}}
                                label="Nom"
                                variant="standard"
                                value={lastname}
                                fullWidth
                            />
                        )}
                    />
                    {errors.lastname ? (
                        <Alert sx={{mt: 2, p: 0, pl: 2}} severity="error">{errors.lastname?.message}</Alert>
                    ) : ''}
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={() => (<FormControl fullWidth sx={{mt: 5, height: 50}}>
                                <InputLabel htmlFor="password" sx={{left: '-15px'}}>Password</InputLabel>
                                <Input
                                    {...register(
                                        'password', {
                                            required: 'Ce champ est requis',
                                            minLength: {value: 5, message: 'Longueur minimale de 5 caractères'},
                                            pattern: {
                                                value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#:$%^&])/,
                                                message: "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractère spéciale"
                                            }
                                        }
                                    )}
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="standard"
                                    value={password}
                                    endAdornment={
                                        <InputAdornment position="end" sx={{color: "inherit"}}>
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
                        )}
                    />
                    {errors.password ? (
                        <Alert sx={{mt: 2, p: 0, pl: 2}} severity="error">{errors.password?.message}</Alert>
                    ) : ''}

                    <Box className="regex">
                        <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                            <Box ref={min} className="bubble"></Box>
                            <Box>Le mot de passe doit contenir au moins une minuscule</Box>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                            <Box ref={max} className="bubble"></Box>
                            <Box>Le mot de passe doit contenir au moins une majuscule</Box>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                            <Box ref={num} className="bubble"></Box>
                            <Box>Le mot de passe doit contenir au moins un chiffre</Box>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                            <Box ref={spec} className="bubble"></Box>
                            <Box>Le mot de passe doit contenir au moins un caractère spécial</Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid item sx={{
                minwidth: '100%',
                display: "flex",
                flexColumn: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Button type="submit" disabled={!isDirty || !isValid} variant="contained" sx={{m: 8}}>VALIDER</Button>
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
}

export default Register;