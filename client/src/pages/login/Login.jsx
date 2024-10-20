import React, {useContext} from 'react';

import './style.scss'
import {setTitle} from "../../utils/title";
import {Notify} from "../../components/notify/Notify";
import {GoogleLogin} from "@react-oauth/google";
import {setCookie} from "../../utils/cookie";
import {redirect} from "../../utils/utils";

const Login = () => {

    setTitle("Dashboard | Login");

    const notify = useContext(Notify);

    return (
        <div>
            <div className="d-flex vh-100">
                <div className="m-auto rounded text-center w-100">
                    <h1 className="text-white mb-4"> Gestionale Clienti - Login </h1>

                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            setCookie("token", credentialResponse?.credential, 7);
                            redirect("/")
                        }}
                        onError={() => {
                            notify.showMessage("error", "Login fallito, riprova");
                        }}
                        containerProps={{ className: "google-button" }}
                    />

                </div>
            </div>
        </div>
    )
}

export default Login;