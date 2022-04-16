import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
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
            navigate("/");
        }
    }

    useEffect(() => {
        fetchCurrentUser()
    }, [])
    return(
        <div>
            <h1>Profile Screen</h1>
            {JSON.stringify(currentUser)}
        </div>
    );
};
export default ProfileScreen;