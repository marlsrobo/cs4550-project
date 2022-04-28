import React, {useEffect, useState} from "react";
import NavigationSidebar from "../NavigationSidebar";
import axios from "axios";
import HomeReviewList from "./HomeReviewList";
import {findAllAlbumReviews} from "../Services/albums-service";
import {findUsersOfTypeNotFollowingForUser} from "../Services/users-service";
import HomeScreenFollowUserItem from "./HomeScreenFollowUserItem";
import {useDispatch} from "react-redux";
import {findAllReviews} from "../Actions/album-reviews-actions";

const api = axios.create({
    withCredentials: true
});

const HomeScreen = () => {
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState({});
    // const [albumReviews, setAlbumReviews] = useState([]);
    const [criticsNotFollowing, setCriticsNotFollowing] = useState([]);
    const [listenersNotFollowing, setListenersNotFollowing] = useState([]);

    const fetchCurrentUser = async () => {
        try {
            const response = await api.post('http://localhost:4000/api/profile');
            setCurrentUser(response.data);
            getCriticsNotFollowing(response.data).then(critics => setCriticsNotFollowing(critics));
            getListenersNotFollowing(response.data).then(listeners => setListenersNotFollowing(listeners));

        } catch (e) {

        }
    }

    const getCriticsNotFollowing = async (user) => {
        try {
            return await findUsersOfTypeNotFollowingForUser(user._id, "critic");
        } catch (e) {

        }
    }

    const getListenersNotFollowing = async (user) => {
        try {
            return await findUsersOfTypeNotFollowingForUser(user._id, "listener");
        } catch (e) {

        }
    }

    // const getAlbumReviews = async () => {
    //     try {
    //         const reviews = findAllReviews(dispatch);
    //         console.log("album reviewd...");
    //         return reviews;
    //     } catch (e) {
    //         console.log("getting reviews bad");
    //     }
    // }

    const middleComponent = () => {
        return (
            <div>
                <HomeReviewList/>
            </div>
        );
    }


    useEffect(() => {
        fetchCurrentUser();
        // getAlbumReviews().then(reviews => setAlbumReviews(reviews));
    }, [])
    return (

        <div className="row">
            <div className="col-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="home"/>
            </div>
            <div className="col-10 col-lg-11 col-xl-10">
                <div className="row">
                    <h4>Welcome to JANKIFY!</h4>
                    {
                        JSON.stringify(currentUser) === "{}" &&
                        <h6 className="mb-3">Log in or sign up to start reviewing albums, following artists, and see what other users are
                            liking and disliking</h6>
                    }
                </div>
                <div className="row">
                    {
                        JSON.stringify(currentUser) === "{}" &&
                        middleComponent()
                    }
                    {
                        JSON.stringify(currentUser) !== "{}" &&
                        <div className="col-8 col-lg-9 col-xl-8 mt-3">
                            {middleComponent()}
                        </div> }
                    {    JSON.stringify(currentUser) !== "{}" &&
                        <div className="col-4 col-lg-3 col-xl-4 mt-3">
                            <ul className="list-group mb-3">
                                <li className="list-group-item">
                                    <h5 className="mt-2" style={{"fontSize": "20px"}}>Critics to follow</h5>
                                </li>
                                {criticsNotFollowing.map(critic => <HomeScreenFollowUserItem user={critic}/>)}
                            </ul>

                            <ul className="list-group">
                                <li className="list-group-item">
                                    <h5 className="mt-2" style={{"fontSize": "20px"}}>Listeners to follow</h5>
                                </li>
                                {listenersNotFollowing.map(listener => <HomeScreenFollowUserItem user={listener}/>)}
                            </ul>
                        </div>

                    }


                </div>
            </div>


        </div>
    );
};
export default HomeScreen;