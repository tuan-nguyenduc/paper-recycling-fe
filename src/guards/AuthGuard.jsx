import {useRouter} from "next/router";
import {useEffect} from "react";
import {PROFILE_STORAGE_KEY} from "@/constant/constant";

const AuthGuard = ({children}) => {
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        let isLoggedIn = !!localStorage.getItem(PROFILE_STORAGE_KEY);

        if (!isLoggedIn) {
            router.push('/login')
            return
        }
    }, [router.isReady]);
    return children
}

export default AuthGuard