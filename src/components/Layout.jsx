import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Outlet, redirect } from "react-router-dom"

export const Layout = () => {
    const auth = useSelector((state) => state.auth.isSignIn);

    // redirection
    useEffect(() => {
        const loader = async () => {
            const auth = await useSelector((state) => state.auth.isSignIn);
            // authに何も無ければsignInにリダイレクトする
            if (!auth) {
                return redirect("/signin");
            }
        }
        loader();
    }, []);

    return (
        <>
            <Outlet />
        </>
    )
}