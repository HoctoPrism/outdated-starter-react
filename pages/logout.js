import {useRouter} from "next/router";

function Logout () {
    if (typeof window !== "undefined") {
        const router = useRouter()
        localStorage.removeItem('access_token');
        router.push('/')
        return true
    }
}

export default Logout
