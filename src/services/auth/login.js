import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Snackbar, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

function Login() {
  document.title = "Connexion au site";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });
  const [toast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({});
  const navigate = useNavigate();

  let login = async () => {

    try {
      let formData = new FormData();
      formData.append('email', email)
      formData.append('password', password)
      let res = await axios.post("http://127.0.0.1:8000/api/login/", formData, {
        "headers" : { "Content-Type":"multipart/form-data" }
      });
      if (res.status === 200) {
          localStorage.setItem("access_token", res.data.token)
          navigate(-1);
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
  };

const handleClickShowPassword = () => {
  if (showPassword) {
    setShowPassword(false)
  }else{
    setShowPassword(true)
  }
}

  return (
    <Box>
      <Typography variant="h1" sx={{ fontSize: "55px", textAlign: "center" }}>
        Connexion
      </Typography>
      <Typography
        variant="h2"
        sx={{ fontSize: "25px", textAlign: "center", my: 8 }}
      >
        Vous devez être connecté pour accéder au site
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexColumn: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button href="register" variant="contained">
          Créer un compte
        </Button>
      </Box>
      {errMessage ? <h4>{errMessage}</h4> : null}
        <form onSubmit={handleSubmit(login)} onKeyDown={(e) => e.key === 'Enter' ? handleSubmit(login) : null}>
          <Grid
            container
            spacing={12}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Grid item sx={{ maxWidth: "400px" }}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={() => (
                  <TextField
                    {...register("email", {
                      required: "Ce champ est requis",
                    })}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mt: 5, height: 50 }}
                    label="Email"
                    variant="standard"
                    value={email}
                    fullWidth
                  />
                )}
              />
              {errors.email ? (
                <Alert sx={{ mt: 2, p: 0, pl: 2 }} severity="error">
                  {errors.email?.message}
                </Alert>
              ) : (
                ""
              )}

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={() => (
                  <FormControl fullWidth sx={{ mt: 5, height: 50 }}>
                    <InputLabel htmlFor="password" sx={{ left: "-15px" }}>
                      Password
                    </InputLabel>
                    <Input
                      {...register("password", {
                        required: "Ce champ est requis",
                      })}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      variant="standard"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment
                          position="end"
                          sx={{ color: "inherit" }}
                        >
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
                <Alert sx={{ mt: 2, p: 0, pl: 2 }} severity="error">
                  {errors.password?.message}
                </Alert>
              ) : (
                ""
              )}
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
              <Button variant="contained" type="submit" sx={{ m: 8 }}>
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
  );
}

export default Login
