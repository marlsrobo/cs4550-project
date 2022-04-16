import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

const api = axios.create({
    withCredentials: true
});

const LoginComponent = () => {
    const [currentUser, setCurrentUser] = useState({});
    const fetchCurrentUser = async () => {
        try {
            const response = await api.post('http://localhost:4000/api/profile');
            setCurrentUser(response.data);
        } catch (e) {
        }
    }

    const profileInfo = () => {
        if (currentUser) {
            return <h3>Hello {currentUser.firstName}</h3>
        }
        else {
            return <h3>Login</h3>
        }
    }

    useEffect(() => {
        fetchCurrentUser()
    }, [])
    return (
        <div>
            {!currentUser && <Link to='/login'>Login</Link>}
            {currentUser && currentUser.firstName}
        </div>
    );
}

export default LoginComponent;