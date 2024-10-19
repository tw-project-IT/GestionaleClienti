export const redirect = (path) => {
    window.location.pathname = path;
    return null;
}

export const redirectLogin = () => redirect("/login");