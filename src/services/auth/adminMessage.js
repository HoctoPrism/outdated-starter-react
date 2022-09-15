import {Alert, Snackbar} from "@mui/material";
import {useEffect, useState} from "react";

let AdminMessage = (props) => {

    const [toast, setShowToast] = useState(false);
    const [severityToast, setSeverityToast] = useState('');
    const [messageToast, setMessageToast] = useState('');

    useEffect(() => {
        if (props.adminMessage === "unauthorizedRole"){
            setMessageToast('accès refusé');
            setSeverityToast('error');
            setShowToast(true);
        } else if(props.adminMessage === "alreadyLogged"){
            setMessageToast('Vous êtes déjà connecté');
            setSeverityToast('info');
            setShowToast(true);
        }
    }, [])


    return (
        <Snackbar
            open={toast}
            autoHideDuration={3000}
            onClose={() => setShowToast(false)}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={() => setShowToast(false)} severity={severityToast} sx={{width: '100%'}}>
                    {messageToast}
                </Alert>
        </Snackbar>
    )
}

export default AdminMessage