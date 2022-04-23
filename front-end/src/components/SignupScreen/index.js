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
const SignupScreen = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const dobRef = useRef();
    const navigate = useNavigate();

    const getUserType = () => {
        let listenerRadio = document.getElementById("listener");
        if (listenerRadio.checked) {
            return "listener";
        } else {
            return "critic";
        }
    }

    const handleSignin = async () => {
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

    const handleSignup = async () => {
        try {
            // todo move to user-service.js
            await axios.post('http://localhost:4000/api/signup',
                {
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                    firstName: firstNameRef.current.value,
                    lastName: lastNameRef.current.value,
                    userType: getUserType(),
                    dob: dobRef.current.value
                });
            handleSignin();
            // navigate('/signin');
        } catch (e) {
            alert('user already exists');
        }

    }
    return (
        <div className="row">
            <div className="col-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="home"/>
            </div>
            <div className="col-10 col-lg-11 col-xl-10 row mt-5">
                <div className="col-6">
                    <input ref={firstNameRef} placeholder="First Name" className="form-control" tabIndex="1"/>
                    <br/>
                    <input ref={emailRef} placeholder="Email" type="email" className="form-control col-6 mb-3"
                           tabIndex="3"/>
                    <input className="form-control" type="date" ref={dobRef} tabIndex="5"/>
                    <br/>
                    <div className="form-check">
                        <input defaultChecked className="form-check-input" type="radio" id="listener" name="userType"/>
                        <label className="form-check-label" htmlFor="listener">
                            Listener
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" id="critic" name="userType"/>
                        <label className="form-check-label" htmlFor="critic">
                            Critic
                        </label>
                    </div>
                    <button onClick={handleSignup} className="btn btn-primary mt-3">Signup</button>

                </div>
                <div className="col-6">
                    <input ref={lastNameRef} placeholder="Last Name" className="form-control" tabIndex="2"/>
                    <br/>
                    <input ref={passwordRef} placeholder="Password" type="password" className="form-control col-6"
                           tabIndex="4"/>
                </div>
            </div>
        </div>
    );
};

export default SignupScreen;