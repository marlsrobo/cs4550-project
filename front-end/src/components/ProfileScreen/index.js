import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import PrivacyPolicyComponent from "../PrivacyPolicyComponent";
import NavigationSidebar from "../NavigationSidebar";
import axios from "axios";

const api = axios.create({
    withCredentials: true
});

const ProfileScreen = () => {

    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();
    const fetchCurrentUser = async () => {
        try {
            const response = await api.post('http://localhost:4000/api/profile');
            setCurrentUser(response.data);
        } catch (e) {
            navigate("/profile");
        }
    }

    useEffect(() => {
        fetchCurrentUser()
    }, [])
    return(
        <div className="row mt-2">
            <h1>Profile Screen</h1>
            <div className="col-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="profile"/>
            </div>
            {JSON.stringify(currentUser)}
            <PrivacyPolicyComponent/>
        </div>
    );
};
export default ProfileScreen;