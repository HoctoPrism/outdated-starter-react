import { useNavigate } from "react-router-dom";

function Logout () {
    let navigate = useNavigate();
    localStorage.removeItem('access_token');
    navigate(-1);
    return true
  }

export default Logout
