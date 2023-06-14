import {Box, Button, FormControl, Modal, Snackbar, Typography, Alert} from "@mui/material";
import {useEffect, useState} from "react";
import update from "immutability-helper";
import {DeleteForeverRounded} from "@mui/icons-material";
import axios from "axios";
import {useSession} from "next-auth/react";

function Delete(props) {

    const [oneType, setOneType] = useState(""); // get parking
    const [delType, setShowDelete] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const { data: session, status } = useSession();

    let deleteType = async (e) => {
        e.preventDefault();
        try {

            // Ici on test si l'utilisateur est admin et a un token JWT, si il l'a pas il ne sera pas autorisé
            let auth = {};
            if (!session?.user?.token && session?.user?.role !== "ROLE_ADMIN") {
                return auth
            } else {
                auth = { "headers" : {"Authorization":"Bearer"+session?.user?.token} }
            }

            let res = await axios.delete('/api/types/' + oneType.id, auth)
            if (res.status === 200) {
                const foundIndex = props.deleteValue.data.findIndex(x => x.id === oneType.id);
                let data = update(props.deleteValue.data, {$splice: [[foundIndex, 1]]})
                props.handleDataChange(data, 'delete');
                setShowDelete(false)
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return(<Box>
            <Button
                variant='contained'
                sx={{mx: 2}}
                onClick={ () => {
                    setShowDelete(true)
                    setOneType({id: props.deleteValue.id, name: props.deleteValue.name} )
                } }
            >
                <DeleteForeverRounded/>
            </Button>
            <Modal
                id="modal-type-container"
                className="modal-container"
                hideBackdrop
                open={delType}
                onClose={() => setShowDelete(false)}
                aria-labelledby="delete-type-title"
                aria-describedby="child-modal-description"
            >
                <Box className="modal-crud modal-type" sx={{bgcolor: 'background.default'}}>
                    <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="delete-type-title">Supprimer un type de
                        voiture</Typography>
                    <FormControl>
                        <Box>
                            êtes vous sur de vouloir supprimer le type : {oneType.name}?
                        </Box>
                        <Box className="action-button">
                            <Button sx={{m: 3}} type="submit" variant="contained" onClick={deleteType}>Envoyer</Button>
                            <Button variant="outlined" onClick={() => setShowDelete(false)}>Fermer</Button>
                        </Box>
                    </FormControl>
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

export default Delete