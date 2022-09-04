import {useState} from "react";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {loggedTrue} from "../../component/features/loginButton/loginButtonSlice";
import {
    Alert,
    Box,
    Button, FormControl,
    Grid,
    IconButton,
    Input,
    InputAdornment, InputLabel,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {useForm, Controller} from "react-hook-form";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import axios from "axios";

function Login () {

    document.title = 'Connexion au site'

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()

    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const { register, control, handleSubmit, formState: { errors } } = useForm({defaultValues: {email: '', password: ''}});

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.pathname || "/"; //travail sur la redirection

    let login = async () => {
        try {
            let formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            let res = await axios.post('http://127.0.0.1:8000/api/login/', formData, {
                "headers" : { "Content-Type":"multipart/form-data" }
            });

            if (res.status === 200) {
                localStorage.setItem('access_token', res.data.token)
                setToastMessage({message: "Vous êtes connecté !", severity: "success"});
                setShowToast(true);
/*                navigate(from, { replace: true });*/
                await dispatch(loggedTrue())
                navigate('/', { replace: true });
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
        <Typography variant='h1' sx={{ fontSize: "55px", textAlign: "center" }}>Connexion</Typography>
        <Typography variant='h2' sx={{ fontSize: "25px", textAlign: "center", my: 8 }}>Vous devez être connecté pour accéder au site</Typography>
        <Box className="f-r-c-c"><Button variant="contained" href='register'>Créer un compte</Button></Box>
            <form onSubmit={handleSubmit(login)}>
                <Grid container spacing={12} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Grid item sx={{ width: '50vh' }}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={() => (
                                <TextField
                                    {...register(
                                    'email', { required: 'Ce champ est requis'}
                                    )}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{mt: 5, height: 50}}
                                    label="Email"
                                    variant="standard"
                                    value={email}
                                    fullWidth
                                />
                            )}
                        />
                        {errors.email ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.email?.message}</Alert>
                        ) : ''}

                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={() => (<FormControl fullWidth sx={{mt: 5, height: 50}}>
                                <InputLabel htmlFor="password" sx={{ left: '-15px' }}>Password</InputLabel>
                                <Input
                                    {...register(
                                    'password', {
                                            required: 'Ce champ est requis',
                                            minLength: {value: 5, message: 'Longueur minimale de 5 caractères'}
                                        }
                                    )}
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="standard"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                    <InputAdornment position="end" sx={{ color: "inherit" }}>
                                        <IconButton
                                            color="inherit"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={(e) => e.preventDefault()}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>
                            )}
                        />
                        {errors.password ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.password?.message}</Alert>
                        ) : ''}
                    </Grid>
                </Grid>
                <Grid item sx={{ minwidth: '100%' }} className="f-c-c-c">
                    <Button variant="contained" type="submit" sx={{m: 8}}>Connexion</Button>
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

export default Login;