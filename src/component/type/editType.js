import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";

function EditType(props) {
    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [oneType, setOneType] = useState(""); // get parking
    const [editType, setShowEdit] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: {name: props.updateValue.name} });

    let editTypeForm = async () => {
        try {
            let updatedPark = {
                id: id ? id : parseInt(oneType.id),
                name: name ? name : oneType.name,
            }
            let res = await fetch("http://127.0.0.1:8000/api/types/" + oneType.id, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPark),
            })
            if (res.status === 200) {
                const foundIndex = props.updateValue.data.findIndex(x => x.id === oneType.id);
                let data = update(props.updateValue.data, {[foundIndex]: {$set: updatedPark}})
                props.handleDataChange(data, 'edit');
                setShowEdit(false)
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
                setShowToast(true)
            }

        } catch (err) {
            console.log(err);
        }
    }

    return(<Box>
          <Button color='info' variant='contained' sx={{mx: 2}}
            onClick={() => {
                setShowEdit(true)
                setOneType({id: props.updateValue.id, name: props.updateValue.name})
            }}>
              <Edit/>
          </Button>
         <Modal
            hideBackdrop
            open={editType}
            onClose={() => setShowEdit(false)}
            aria-labelledby="edit-type-title"
            aria-describedby="child-modal-description"
        >
            <Box className="toto" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-type-title">Editer un type de voiture</Typography>
                <form onSubmit={handleSubmit(editTypeForm)}>
                    <FormControl>
                          <Controller
                              name="name"
                              control={control}
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
                                   defaultValue={name}
                                />
                              )}
                            />
                            {errors.name ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.name?.message}</Alert>
                            ) : ''}
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'right'}}>
                            <Button type="submit" sx={{m: 3}} variant="contained">Envoyer</Button>
                            <Button variant="outlined" onClick={() => setShowEdit(false)}>Fermer</Button>
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
export default EditType;