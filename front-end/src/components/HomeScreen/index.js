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


    useEffect(() => {
        fetchCurrentUser()
    }, [])
    return(
        <div className="row">
            <div className="col-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="home"/>
            </div>
            <div className="col-10 col-lg-11 col-xl-10 mt-3">
                <div className="mb-4">
                    <h4>Welcome to JANKIFY!</h4>
                    {
                        JSON.stringify(currentUser) === "{}" &&
                        <h6>Log in or sign up to start reviewing albums, following artists, and see what other users are liking and disliking</h6>
                    }
                </div>
                <div className="list-group">
                    <div className="list-group-item">
                        tuit 1
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomeScreen;