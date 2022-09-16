import {useRouter} from "next/router";

function Logout () {
    const router = useRouter()
    if (typeof window !== "undefined") {
        localStorage.removeItem('access_token');
        router.push('/')
        return true
    }
}

export default Logout
