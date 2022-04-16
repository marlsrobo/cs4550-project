import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const api = axios.create({
    withCredentials: true
});
// According to the zoom recordings:
// we need to put all the user-controller stuff in the
// backend side so we can retrieve users from the api.
//  (see user-controller.js in the repo)
const SigninScreen = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
            // todo move to user-service.js
            await api.post('http://localhost:4000/api/signin',
                {
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                })
            navigate('/profile');
        } catch (e) {
            alert('user does not exist, please retry');
        }

    }
    return(
        <div className="row">
            <h1>Signin</h1>
            <div className="col-6">
                <input ref={emailRef} placeholder="Email" type="email" className="form-control col-6 mb-3" tabIndex="3"/>
                <button onClick={handleSignin} className="btn btn-primary mt-3">Sign in</button>
            </div>
            <div className="col-6">
                <input ref={passwordRef} placeholder="Password" type="password" className="form-control col-6" tabIndex="4"/>
            </div>

        </div>
    );
};

export default SigninScreen;