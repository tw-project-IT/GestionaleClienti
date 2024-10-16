import React from 'react';

// import './style.scss';
import {setTitle} from "../../utils/title";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {

    setTitle("Dashboard | Login");

    return (
        <div>
            <h1 className={"text-light"}>Login </h1>

            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />;
        </div>
    )
}

export default Login;