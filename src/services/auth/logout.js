import {useDispatch} from "react-redux";
import {loggedFalse} from "../../component/features/loginButton/loginButtonSlice";
import {useNavigate} from "react-router-dom";

function Logout () {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    dispatch(loggedFalse())
    localStorage.removeItem('access_token');
    navigate('/', { replace: true });
    return true
}

export default Logout;