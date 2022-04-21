import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

const api = axios.create({
    withCredentials: true
});

const LoginComponent = () => {
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();
    const logoutUser = async () => {
        try {
            const response = await api.post('http://localhost:4000/api/signout');
            window.location.reload();
        } catch (e) {
        }
    }

    const profilePicStyle = {
        width: "70px",
        objectFit: "cover",
        borderRadius: "50%"
    }

    const fetchCurrentUser = async () => {
        try {
            const response = await api.post('http://localhost:4000/api/profile');
            setCurrentUser(response.data);
        } catch (e) {
        }
    }

    const profileInfo = () => {
        if (JSON.stringify(currentUser) !== '{}') {
            return (
                <div>
                    <div className="row">
                        <Link to={`/profile/${currentUser._id}`}>
                              <img src="/images/blankProfile.png" style={profilePicStyle} className="float-start col"/>
                        </Link>
                        <h5 className="float-end col">{currentUser.firstName}</h5>
                    </div>
                    <br/>
                    <button onClick={logoutUser} className="btn btn-secondary mb-3">Logout</button>
                </div>

                );
        }
        else {
            return (
                <div>
                    <Link to='/signin'><button className='btn btn-secondary mb-3 me-3'>Login</button></Link>
                    <Link to='/signup'><button className='btn btn-secondary mb-3'>Sign Up</button></Link>
                </div>
            );
        }
    }

    useEffect(() => {
        fetchCurrentUser();
    }, [])
    return (
        <div>
            {/*{JSON.stringify(currentUser)}*/}
            {profileInfo()}
        </div>
    );
}

export default LoginComponent;