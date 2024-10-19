import React, {useContext} from 'react';

import {setTitle} from "../../utils/title";
import { GoogleLogin } from '@react-oauth/google';
import { setCookie } from "../../utils/cookie";
import {redirect} from "../../utils/utils";
import {Notify} from "../../components/notify/Notify";
import jwtDecode from "jwt-decode";

const Login = () => {

    setTitle("Dashboard | Login");

    const notify = useContext(Notify);

    return (
        <div>
            <h1 className={"text-light"}>Login </h1>

            <GoogleLogin
                onSuccess={credentialResponse => {
                    // TODO: RImuovere debug

                    console.log("decode: " + jwtDecode(credentialResponse?.credential))
                    setCookie("token", credentialResponse?.credential, 7);
                    redirect("/")
                }}
                onError={() => {
                    notify.showMessage("error", "Login fallito, riprova");
                }}
            />;
        </div>
    )
}

export default Login;