import { removeCookie } from "./cookie";

export const redirect = (path) => {
    window.location.pathname = path;
    return null;
}

export const redirectLogin = () => redirect("/login");

export const logout = () => {
    removeCookie('token');
    return redirect("/login");
}
