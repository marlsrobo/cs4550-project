import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import NavigationSidebar from "../NavigationSidebar";
import {updateUser} from "../Actions/users-actions";
import axios from "axios";
import {findUserById} from "../Actions/users-actions";

const api = axios.create({
    withCredentials: true
});

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const [profileUser, setProfileUser] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();

    const updateAboutDatabase = (newAbout) => {
        updateUser(dispatch, {
            ...currentUser,
            about: newAbout
        })
        fetchCurrentUser();
    };

    const fetchCurrentUser = async () => {
        try {
            const response = await api.post('http://localhost:4000/api/profile');
            const currentUserId = response.data._id;
            // todo value of current user needs to be updated within session cookie as well as in database (database is fine_
            // todo need to change user in session cookie, maybe also check Jose lecture from monday
            const databaseUser = findUserById(dispatch, currentUserId);
            setCurrentUser(response.data);
        } catch (e) {
            // navigate("/");
        }
    }

    const fetchProfileUser = async () => {
        try {
            // todo this isnt the way we should be doing this but it works for now
            const response = await api.get(`http://localhost:4000/api/users/${userId}`);
            console.log(response.data);
            const currentUserId = response.data._id;
            const databaseUser = findUserById(dispatch, userId);
            setProfileUser(response.data);
        } catch (e) {
            // navigate("/");
        }
    }

    const formatDob = (dob) => {
        try {
            const date = new Date(dob);
            console.log(date);
            return date.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'});
        } catch (e) {
        }
    }

    const profilePicStyle = {
        width: "200px",
        objectFit: "cover",
        borderRadius: "50%"
    }

    const saveAbout = () => {
        const currentAboutForm = document.getElementById("about-me-form");
        const currentAboutFormValue = currentAboutForm.value;
        const aboutMeText = document.createElement('p');
        updateAboutDatabase(currentAboutFormValue);
        aboutMeText.id = "about-me";
        aboutMeText.innerHTML = currentAboutFormValue;
        currentAboutForm.parentNode.replaceChild(aboutMeText, currentAboutForm);

        const currentSaveButton = document.getElementById("save-about-button");
        const editAboutButton = document.createElement('button');
        editAboutButton.className = "btn btn-secondary";
        editAboutButton.id = "edit-about-button";
        editAboutButton.innerHTML = "Edit";
        editAboutButton.onclick = function () {
            updateAbout()
        };
        currentSaveButton.parentNode.replaceChild(editAboutButton, currentSaveButton);
    }


    const updateAbout = () => {

        const currentAbout = document.getElementById("about-me");
        const currentAboutValue = currentAbout.innerHTML;
        const aboutMeForm = document.createElement('textarea');
        aboutMeForm.id = "about-me-form";
        aboutMeForm.className = "form-control";
        aboutMeForm.innerHTML = currentAboutValue;
        currentAbout.parentNode.replaceChild(aboutMeForm, currentAbout);

        const currentEditButton = document.getElementById("edit-about-button");
        const saveEditButton = document.createElement('button');
        saveEditButton.className = "btn btn-primary";
        saveEditButton.id = "save-about-button";
        saveEditButton.innerHTML = "Save";
        saveEditButton.onclick = function () {
            saveAbout()
        };
        currentEditButton.parentNode.replaceChild(saveEditButton, currentEditButton);


    }

    useEffect(() => {
        fetchProfileUser().then(user => console.log(user));
        fetchCurrentUser();
    }, [])
    return (
        <div className="row mt-2">
            <h1>Profile Screen</h1>
            <div className="col-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="profile"/>
            </div>
            <div className="col-10 col-lg-11 col-xl-10 mt-3">
                <div className="row mb-5">
                    <div className="col-4">
                        <img src={profileUser.profilePic} style={profilePicStyle} className="mb-3"/>
                        <label htmlFor="formFile" className="form-label">Change profile picture</label>
                        <input className="form-control" type="file" id="formFile"/>
                    </div>
                    <div className="col-8">
                        <h2>{profileUser.firstName} {profileUser.lastName}</h2>
                        <h4>{profileUser.userType}</h4>
                    </div>
                </div>
                <div className="row mb-4">
                    <h4>Personal Information</h4>
                    <h5>Email: {profileUser.email}</h5>
                    <h5>Date of birth: {formatDob(profileUser.dob)}</h5>
                </div>
                <div className="row">
                    <h4 className="col-11">About</h4>
                    <div className="col-1">
                        <button className="btn btn-secondary" id="edit-about-button"
                                onClick={updateAbout}>Edit
                        </button>
                    </div>
                </div>
                <div>
                    <p id="about-me">
                        {profileUser.about}
                    </p>
                </div>
            </div>
            {JSON.stringify(profileUser)}
        </div>
    );
};
export default ProfileScreen;