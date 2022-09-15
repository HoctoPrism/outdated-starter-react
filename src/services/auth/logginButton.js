import {AppBar, Box, Button} from "@mui/material";
import {useEffect, useState} from "react";
import auth from './token'

export function LogginButton() {

    const tokenHere = auth.getToken() && auth.getExpiryTime();
    const [href, setHref] = useState('login')
    const [message, setMessage] = useState('CONNEXION')

    useEffect(() => {
        if (tokenHere){
            setHref('logout')
            setMessage('DECONNEXION')
        }
    }, [tokenHere])

    return (
        <Button href={href} color="secondary">{message}</Button>
    )
}