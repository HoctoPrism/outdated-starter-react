import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert, Input} from "@mui/material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";

function NewType(props) {

    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [newType, setShowNew] = useState(false);
    // Handle Toast event
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const { register, control, handleSubmit, formState: { errors } } = useForm({defaultValues: {name: ''}});

    let newTypeForm = async () => {
        try {
            let newType = {
                id: id ? parseInt(id) : (props.newValue.data.at(-1).id + 1),
                name: name,
            }
            let res = await fetch("http://127.0.0.1:8000/api/types/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newType),
            });
            if (res.status === 200) {
                let tab = {};
                await res.json().then((data) => { Object.assign(tab, data.data) });
                let data = update(props.newValue.data, {$push: [{id : tab.id, name: tab.name}]})
                props.handleDataChange(data);
                setName("");
                setToastMessage({message: "Type ajouté ! Vous pouvez en ajouter un autre", severity: "success"});
                setShowToast(true);
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (<Box>
        <Button variant="contained" onClick={() => setShowNew(true)}>Ajouter</Button>
        <Modal
            hideBackdrop
            open={newType}
            onClose={() => setShowNew(false)}
            aria-labelledby="new-type-title"
            aria-describedby="child-modal-description"
        >
            <Box className="toto" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="new-type-title">Nouveau type de voiture</Typography>
                <form onSubmit={handleSubmit(newTypeForm)}>
                    <FormControl>
                        <Controller
                          name="name"
                          control={control}
                          defaultValue=""
                          render={() => (
                              <TextField
                               {...register(
                                   'name',
                                   {
                                       required: 'Ce champ est requis',
                                       minLength: {value: 5, message: 'Longueur minimale de 5 caractères'}
                                   }
                               )}
                               onChange={(e) => setName(e.target.value)}
                               style={{width: 400, height: 50}}
                               label="Nom"
                               variant="standard"
                               value={name}
                            />
                          )}
                        />
                        {errors.name ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.name?.message}</Alert>
                        ) : ''}
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'right', mt:5}}>
                            <Button type="submit" sx={{m: 3}} variant="contained">Envoyer</Button>
                            <Button variant="outlined" onClick={() => setShowNew(false)}>Fermer</Button>
                        </Box>
                    </FormControl>
                </form>

            </Box>
        </Modal>

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

export default NewType;