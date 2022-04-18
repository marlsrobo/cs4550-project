import React, {useEffect, useState} from "react";
import NavigationSidebar from "../NavigationSidebar";
import {Outlet, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import './index.css';

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

            {/*<div className="col-10 col-lg-7 col-xl-6">*/}
            {/*    <Outlet/>*/}
            {/*</div>*/}
            {/*<div className="d-none d-lg-block col-lg-4 col-xl-4">*/}
            {/*    <WhoToFollowList/>*/}
            {/*</div>*/}
            <div className="pos-fixed dimension-landscape bg-color-dark-gray pt-3 ps-5">
                <b>Notice.</b> By using our website, you agree to our <Link to="/privacy-policy">Privacy Policy.</Link>
                {/*<Link to="/privacy-policy">*/}
                {/*   <button className='btn btn-primary mb-3 me-3 float-right'>Read Privacy Policy</button>*/}
                {/*</Link>*/}
            </div>
        </div>
    );
};
export default HomeScreen;