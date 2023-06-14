import {getCsrfToken, signOut, useSession} from "next-auth/react"
import React, {useState} from 'react';
import {Box, Button, Modal, Typography} from "@mui/material";

export default function Logout({csrfToken = getCsrfToken()}) {

    const {data: session, status} = useSession();
    const [logout, setShowLogout] = useState(false)

    return (
        <Box>
            <Button color="secondary" onClick={() => setShowLogout(true)}>Déconnexion</Button>
            <Modal
                id="modal-logout-container"
                className="modal-container"
                hideBackdrop
                open={logout}
                onClose={() => setShowLogout(false)}
                aria-labelledby="logout-title"
                aria-describedby="child-modal-description"
            >
                <Box className="modal-crud modal-logout" sx={{ backgroundColor: "background.paper"}}>
                    <Typography>Êtes vous sur de vouloir vous déconnecter ?</Typography>
                    <Box className="action-button">
                         <Button variant="contained" sx={{m: 3}} onClick={() => signOut()}>Oui</Button>
                         <Button variant="outlined" onClick={() => setShowLogout(false)}>Non</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}
