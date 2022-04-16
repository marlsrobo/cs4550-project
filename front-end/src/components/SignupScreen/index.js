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
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const navigate = useNavigate();

    const getUserType = () => {
        let listenerRadio = document.getElementById("listener");
        if (listenerRadio.checked) {
            return "listener";
        } else {
            return "artist";
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
                    userType: getUserType()
                })
            navigate('/signin');
        } catch (e) {
            alert('user already exists');
        }

    }
    return(
        <div className="row">
            <h1>Signup</h1>
            <div className="col-6">
                <input ref={firstNameRef} placeholder="First Name" className="form-control" tabIndex="1"/>
                <br/>
                <input ref={emailRef} placeholder="Email" type="email" className="form-control col-6 mb-3" tabIndex="3"/>
                <div className="form-check">
                    <input defaultChecked className="form-check-input" type="radio" id="listener" name="userType"/>
                        <label className="form-check-label" htmlFor="listener">
                            Listener
                        </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" id="artist" name="userType"/>
                        <label className="form-check-label" htmlFor="artist">
                            Artist
                        </label>
                </div>
                <button onClick={handleSignup} className="btn btn-primary mt-3">Signup</button>

            </div>
            <div className="col-6">
                <input ref={lastNameRef} placeholder="Last Name" className="form-control" tabIndex="2"/>
                <br/>
                <input ref={passwordRef} placeholder="Password" type="password" className="form-control col-6" tabIndex="4"/>
            </div>

        </div>
    );
};

export default SignupScreen;