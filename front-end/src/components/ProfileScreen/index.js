import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import NavigationSidebar from "../NavigationSidebar";
import {updateUser} from "../Actions/users-actions";
import axios from "axios";
import {
    findAlbumReviewsByUserId,
    findDislikedAlbumsByUserId,
    findLikedAlbumsByUserId
} from "../Services/albums-service";
import AlbumReviewList from "../SearchScreen/AlbumReviewList";
import {createArtist, findArtistById, findFollowedArtistsForUser, followArtist} from "../Services/artists-service";
import {findFollowedUsersForUser, followUser, unfollowUser, findUserById} from "../Services/users-service";

const api = axios.create({
    withCredentials: true
});

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const {profileUserId} = useParams();
    const [profileUser, setProfileUser] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [userLikedAlbums, setUserLikedAlbums] = useState([]);
    const [userDislikedAlbums, setUserDislikedAlbums] = useState([]);
    const [followingArtists, setFollowingArtists] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [albumReviews, setAlbumReviews] = useState([]);
    const [userFollowingProfileUser, setUserFollowingProfileUser] = useState(false);

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
            const albums = await findLikedAlbumsByUserId(profileUserId);
            return albums;
        } catch (e) {
            console.log("getting liked albums bad");
        }
    }

    const getDislikedAlbums = async () => {
        try {
            const albums = await findDislikedAlbumsByUserId(profileUserId);
            console.log(albums);
            return albums;
        } catch (e) {
            console.log("getting disliked albums bad");
        }
    }

    const getFollowingArtists = async () => {
        try {
            const artists = await findFollowedArtistsForUser(profileUserId);
            console.log("artists following")
            console.log(artists);
            return artists;
        } catch (e) {
            console.log("getting following artists bad");
        }
    }

    const getFollowingUsers = async () => {
        try {
            const users = await findFollowedUsersForUser(profileUserId);
            console.log("users following")
            console.log(users);
            return users;
        } catch (e) {
            console.log("getting following artists bad");
        }
    }

    const getAlbumReviews = async () => {
        try {
            const reviews = await findAlbumReviewsByUserId(profileUserId);
            console.log("reviews left")
            console.log(reviews);
            console.log(profileUserId);
            return reviews;
        } catch (e) {
            console.log("getting reviews bad");
        }
    }

    const fetchProfileUser = async () => {
        try {
            // todo this isnt the way we should be doing this but it works for now
            // const response = await api.get(`http://localhost:4000/api/users/${profileUserId}`);
            // console.log(response.data);
            const databaseUser = await findUserById(profileUserId);
            setProfileUser(databaseUser);
            console.log(databaseUser);

            getLikedAlbums().then(albums => setUserLikedAlbums(albums));
            getDislikedAlbums().then(albums => setUserDislikedAlbums(albums));
            getFollowingArtists().then(artists => setFollowingArtists(artists));
            getAlbumReviews().then(reviews => setAlbumReviews(reviews));
            getFollowingUsers().then(users => setFollowingUsers(users));
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
            <div className="col-xl-2 col-md-3 col-4 pb-5 me-4">
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
            <div className="col-xl-2 col-md-3 col-4 pb-5 me-4">
                <Link to={`/artist/details/${artist.artistId}`}>
                <div className="float-start">
                    <img src={artist.profilePic} style={artistImageStyle}/>
                    <h5 className="pt-3 text-center">{artist.name}</h5>

                </div>
                </Link>
            </div>
        );
    }

    const formatUser = (user) => {
        return (
            <div className="col-xl-2 col-md-3 col-4 pb-5 me-4">
                <Link to={`/profile/${user._id}`}>
                    <div className="float-start">
                        <img src={user.profilePic} style={artistImageStyle}/>
                        <h5 className="pt-3 text-center">{user.firstName} {user.lastName}</h5>
                    </div>
                </Link>
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

    const usersGrid = (users) => {
        return (
            <div className="row">
                {users.map(user => formatUser(user))}
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
        editAboutButton.className = "btn btn-secondary float-end";
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
        saveEditButton.className = "btn btn-primary float-end";
        saveEditButton.id = "save-about-button";
        saveEditButton.innerHTML = "Save";
        saveEditButton.onclick = function () {
            saveAbout()
        };
        currentEditButton.parentNode.replaceChild(saveEditButton, currentEditButton);
    }

    const handleDeleteAccount = async () => {
        try {
            const deleteUserReviews = await api.delete(`http://localhost:4000/api/users/${profileUserId}/reviews`)
            const deleteUserResponse = await api.delete(`http://localhost:4000/api/users/${profileUserId}`);
            const logoutResponse = await api.post('http://localhost:4000/api/signout');
            navigate("/");
        } catch (e) {
        }
    }

    const currentUserFollowingProfileUser = async () => {
        let currentUser = await api.post('http://localhost:4000/api/profile');
        currentUser = currentUser.data;
        if (JSON.stringify(currentUser) === "{}") {

        }
        else {
            let usersCurrentUserFollowing = await findFollowedUsersForUser(currentUser._id);
            console.log(usersCurrentUserFollowing);
            let followingUser = false;
            usersCurrentUserFollowing.forEach(user => {
                if (user._id === profileUserId) {
                    followingUser = true;
                }
            })
            console.log(followingUser);
            setUserFollowingProfileUser(followingUser);
            return followingUser;
        }
    }

    const handleFollowUser = async () => {
        console.log("followww");
        await followUser(currentUser._id, profileUserId);
        setUserFollowingProfileUser(true);
    }

    const handleUnfollowUser = async () => {
        console.log("unfollow");
        await unfollowUser(currentUser._id, profileUserId);
        setUserFollowingProfileUser(false);
    }

    useEffect(() => {
        fetchProfileUser().then(user => console.log(user));
        fetchCurrentUser();
        currentUserFollowingProfileUser().then(following => setUserFollowingProfileUser(following));
    }, [profileUserId])
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
                        <div className="row">
                            <div className="col-9">
                                <h2>{profileUser.firstName} {profileUser.lastName}</h2>
                                <h4>{profileUser.userType}</h4>
                            </div>
                            <div className="col-3">
                                { profileUser._id === currentUser._id &&
                                    <button className="btn btn-danger float-end" onClick={handleDeleteAccount}>Delete Account</button> }
                                { JSON.stringify(currentUser) !== "{}" && profileUser._id !== currentUser._id  && !userFollowingProfileUser &&
                                    <button className="btn btn-secondary float-end" onClick={handleFollowUser}>Follow User</button> }
                                { JSON.stringify(currentUser) !== "{}" && profileUser._id !== currentUser._id  && userFollowingProfileUser &&
                                    <button className="btn btn-secondary float-end" onClick={handleUnfollowUser}>Unfollow User</button> }
                            </div>
                        </div>
                        <div className="mt-5 row">
                                <h4 className="col-10">About</h4>
                                <div className="col-2">
                                {profileUser._id === currentUser._id &&
                                        <button className="btn btn-secondary float-end" id="edit-about-button"
                                                onClick={updateAbout}>Edit
                                        </button>}
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
                {
                    profileUser.userType === "critic" &&
                    <div className="mb-4">
                        <h4 className="mb-4">Album Reviews</h4>
                        <AlbumReviewList reviews={albumReviews}/>
                    </div>}
                <div>
                    <h4 className="mb-4">Following Users</h4>
                    {usersGrid(followingUsers)}
                </div>
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