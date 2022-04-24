import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import NavigationSidebar from "../NavigationSidebar";
import {updateUser} from "../Actions/users-actions";
import axios from "axios";
import {findUserById} from "../Actions/users-actions";
import {findDislikedAlbumsByUserId, findLikedAlbumsByUserId} from "../Services/albums-service";

const api = axios.create({
    withCredentials: true
});

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const [profileUser, setProfileUser] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [userLikedAlbums, setUserLikedAlbums] = useState([]);
    const [userDislikedAlbums, setUserDislikedAlbums] = useState([]);
    const [followingArtists, setFollowingArtists] = useState([]);
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

    const getLikedAlbums = async () => {
        try {
            const albums = await api.get(`http://localhost:4000/api/albums/${userId}/likes`);
            return albums.data;
        } catch (e) {
            console.log("getting liked albums bad");
        }
    }

    const getDislikedAlbums = async () => {
        try {
            const albums = await api.get(`http://localhost:4000/api/albums/${userId}/dislikes`);
            console.log(albums.data);
            return albums.data;
        } catch (e) {
            console.log("getting disliked albums bad");
        }
    }

    const getFollowingArtists = async () => {
        try {
            const artists = await api.get(`http://localhost:4000/api/artists/${userId}/following`);
            console.log("artists following")
            console.log(artists.data);
            return artists.data;
        } catch (e) {
            console.log("getting following artists bad");
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

            getLikedAlbums().then(albums => setUserLikedAlbums(albums));
            getDislikedAlbums().then(albums => setUserDislikedAlbums(albums));
            getFollowingArtists().then(artists => setFollowingArtists(artists));
        } catch (e) {
            // navigate("/");
        }
    }

    const formatDob = (dob) => {
        try {
            const date = new Date(dob.slice(0, 4), dob.slice(5, 7) - 1, dob.slice(8, 10)).toDateString();
            return date.slice(4);
            // return date.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'});
        } catch (e) {
        }
    }

    const profilePicStyle = {
        width: "300px",
        height: "300px",
        objectFit: "cover",
        borderRadius: "50%"
    }

    const artistImageStyle = {
        width: "180px",
        height: "180px",
        objectFit: "cover",
        borderRadius: "50%"
    }


    const formatAlbumCover = (album) => {
        return (
            <div className="col pb-5">
                <Link to={`/album/details/${album.albumId}`}><img src={album.albumCover} width="180px"/></Link>
            </div>
        );
    }

    const albumGrid = (albums) => {
        return (
            <div className="row">
                {albums.map(album => formatAlbumCover(album))}
            </div>
        );
    }

    const formatArtist = (artist) => {
        return (
            <div className="col pb-5">
                <Link to={`/artist/details/${artist.artistId}`}><img src={artist.profilePic} style={artistImageStyle}/></Link>
            </div>
        );
    }

    const artistsGrid = (artists) => {
        return (
            <div className="row">
                {artists.map(artist => formatArtist(artist))}
            </div>
        );
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
        // getLikedAlbums();
        // getDislikedAlbums();
    }, [])
    return (
        <div className="row">
            <div className="col-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="profile"/>
            </div>
            <div className="col-10 col-lg-11 col-xl-10 mt-3">
                <div className="row mb-5">
                    <div className="col-4">
                        <img src={profileUser.profilePic} style={profilePicStyle} className="mb-3"/>
                        {profileUser._id === currentUser._id &&
                            <div>
                                <label htmlFor="formFile" className="form-label">Change profile picture</label>
                                <input className="form-control" type="file" id="formFile"/>
                            </div>}
                    </div>
                    <div className="col-8">
                        <h2>{profileUser.firstName} {profileUser.lastName}</h2>
                        <h4>{profileUser.userType}</h4>
                        <div className="mt-5">
                            <div className="row">
                                <h4 className="col-11">About</h4>
                                {profileUser._id === currentUser._id &&
                                    <div className="col-1">
                                        <button className="btn btn-secondary" id="edit-about-button"
                                                onClick={updateAbout}>Edit
                                        </button>
                                    </div>}
                            </div>
                            <div className="mb-4">
                                <p id="about-me">
                                    {profileUser.about}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {profileUser._id === currentUser._id &&
                    <div className="row mb-4">
                        <h4>Personal Information</h4>
                        <h6>Email: {profileUser.email}</h6>
                        <h6>Date of birth: {formatDob(profileUser.dob)}</h6>
                    </div>
                }
                <div>
                    <h4 className="mb-4">Following Artists</h4>
                    {artistsGrid(followingArtists)}
                </div>
                <div>
                    <h4 className="mb-4">Liked Albums</h4>
                    {albumGrid(userLikedAlbums)}
                </div>
                <div>
                    <h4 className="mb-4">Disliked Albums</h4>
                    {albumGrid(userDislikedAlbums)}
                </div>

            </div>
        </div>
    );
};
export default ProfileScreen;