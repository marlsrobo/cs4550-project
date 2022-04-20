import React, {useEffect, useState} from "react";
import NavigationSidebar from "../NavigationSidebar";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const api = axios.create({
    withCredentials: true
});

const HomeScreen = () => {
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();
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
    return(
        <div className="row mt-2">
            <h1>Home Screen</h1>
            {profileInfo}
            <div className="col-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="home"/>
            </div>
        </div>
    );
};
export default HomeScreen;