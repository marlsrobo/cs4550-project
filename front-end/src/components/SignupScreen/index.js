import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

// According to the zoom recordings:
// we need to put all the user-controller stuff in the
// backend side so we can retrieve users from the api.
//  (see user-controller.js in the repo)
const SignupScreen = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const handleSignup = async () => {
        try {
            // todo move to user-service.js
            await axios.post('http://localhost:4000/api/signup',
                {
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                })
            navigate('/signin');
        } catch (e) {

        }

    }
    return(
        <div>
            <h1>Signup</h1>
            <input ref={emailRef} placeholder="username" type="email" className="form-control"/>
            <input ref={passwordRef} placeholder="password" type="password" className="form-control"/>
            <button onClick={handleSignup} className="btn btn-primary">Signup</button>
        </div>
    );
};

export default SignupScreen;