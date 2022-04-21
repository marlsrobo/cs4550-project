import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import NavigationSidebar from "../NavigationSidebar";

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
        console.log(emailRef);
        try {
            // todo move to user-service.js
            await api.post('http://localhost:4000/api/signin',
                {
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                })
            navigate('/');
        } catch (e) {
            alert('user does not exist, please retry');
        }
    }
    useEffect(() => {
        console.log(emailRef);
    })
    return (
        <div className="row mt-2 mb-4">
            <h1>Signin</h1>
            <div className="col-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="home"/>
            </div>
            <div className="col-10 col-lg-11 col-xl-10 row mt-5">
                <div className="col">
                    <input ref={emailRef} placeholder="Email" type="email" className="form-control col-6 mb-3"
                           tabIndex="3"/>
                    <button onClick={handleSignin} className="btn btn-primary mt-3">Sign in</button>
                </div>
                <div className="col">
                    <input ref={passwordRef} placeholder="Password" type="password" className="form-control col-6"
                           tabIndex="4"/>
                </div>
            </div>

        </div>
    );
};

export default SigninScreen;