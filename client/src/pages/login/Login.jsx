import React, {useContext} from 'react';

import './style.scss'
import {setTitle} from "../../utils/title";
import {Notify} from "../../components/notify/Notify";
import {GoogleLogin} from "@react-oauth/google";
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

                            fetch(`${process.env.REACT_APP_PROXY}/api/login`, {
                                method: 'POST',
                                credentials: "include",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({token: credentialResponse?.credential})
                            })
                                .then(data => {
                                    if (data.status !== 200) {
                                        return data.json();
                                    }

                                    redirect("/");
                                }).then(data => notify.showMessage("error", data.message))
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