import jwtDecode from "jwt-decode";

let getToken = () => {
    return localStorage.getItem('access_token');
}

let getDecodedToken = () => {
    if (getToken()){
        return jwtDecode(localStorage.getItem('access_token'));
    } else {
        return false
    }
}

let getRoles = () => {
    // On teste si il y a un token décodé et si il n'a pas expiré
    if (getDecodedToken() && !(getDecodedToken().exp * 1000 < Date.now())){
        // la valeur de base est un tableau dans un string, on le parse pour faire sauter le string et
        // on le tostring pour faire sauter le tableau, comme ça on a seulement la valeur
        return JSON.parse(getDecodedToken().roles).toString();
    } else {
        return false
    }
}

let getEmail = () => {
    // On teste si il y a un token décodé et si il n'a pas expiré
    if (getDecodedToken() && !(getDecodedToken().exp * 1000 < Date.now())){
        return getDecodedToken().email;
    } else {

    }
}

export default {getToken, getDecodedToken, getRoles, getEmail}