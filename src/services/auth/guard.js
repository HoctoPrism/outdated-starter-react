import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import {loggedFalse, loggedTrue} from "../../component/features/loginButton/loginButtonSlice";

const token = localStorage.getItem('access_token')

function Guard () {
  
  const dispatch = useDispatch()

  if (token) {   
    const decodedToken = jwtDecode(token)
    if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('access_token')
      dispatch(loggedFalse())
      return false // token expired
    } else {
      dispatch(loggedTrue())
      return true // token valid
    }
  } else {
    dispatch(loggedFalse())
    return false // no token
  }

}

export default Guard;
