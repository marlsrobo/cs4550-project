import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import LoginComponent from "../LoginComponent";
import axios from "axios";

const api = axios.create({
    withCredentials: true
});

const NavigationSidebar = (
    {
        active = 'home'
    }
) => {
    const [currentUser, setCurrentUser] = useState({});

    const fetchCurrentUser = async () => {
        try {
            const response = await api.post('http://localhost:4000/api/profile');
            setCurrentUser(response.data);
        } catch (e) {
        }
    }

    const displayProfileTab = () => {
        if (JSON.stringify(currentUser) !== '{}') {
            return (
                <Link to={`/profile/${currentUser._id}`} className={`list-group-item list-group-item-action ${active === 'profile' ? 'active' : ''}`}>
                <div className="row">
                    <div className="col-2">
                        <i className="fas fa-user"/>
                    </div>
                    <div className="col-10 d-none d-xl-block">Profile</div>
                </div>
            </Link>);
        }
    }

    useEffect(() => {
        fetchCurrentUser();
    }, [])
    return(
        <>
            <div className="list-group">
                <LoginComponent/>
                <Link to="/" className={`list-group-item list-group-item-action ${active === 'home' ? 'active' : ''}`}>
                    <div className="row">
                        <div className="col-2">
                            <i className="fas fa-home"></i>
                        </div>
                        <div className="col-10 d-none d-xl-block">Home</div>
                    </div>
                </Link>
                <Link to="/search" className={`list-group-item list-group-item-action ${active === 'search' ? 'active' : ''}`}>
                    <div className="row">
                        <div className="col-2">
                            <i className="fas fa-search"></i>
                        </div>
                        <div className="col-10 d-none d-xl-block">Search</div>
                    </div>
                </Link>
                {displayProfileTab()}
            </div>
        </>
    );
}
export default NavigationSidebar;