import {findUserById} from "../Services/users-service";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {deleteReview} from "../Actions/album-reviews-actions";

const api = axios.create({
    withCredentials: true
});

const HomeReviewItem = ({review}) => {
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState({});

    const formatReviewer = () => {
        try {
            return <Link to={`/profile/${review.reviewerId}`}>{review.reviewerName}</Link>;
        } catch (e) {
            console.log("reviewer name error");
        }
    }

    const getDatePosted = () => {
        try {
            return new Date(review.datePosted).toLocaleDateString();
        } catch (e) {
            console.log("date posted error")
        }
    }

    const getTimePosted = () => {
        try {
            return new Date(review.datePosted).toLocaleTimeString('default', {hour: "numeric", minute: "numeric"});
        } catch (e) {
            console.log("date posted error")
        }
    }

    const handleDeleteReview = async () => {
        if (JSON.stringify(currentUser) !== "{}") {
            if (currentUser._id === review.reviewerId) {
                deleteReview(dispatch, review);
            }
        }
    }

    const fetchCurrentUser = async () => {
        try {
            const response = await api.post('http://localhost:4000/api/profile');
            const currentUserId = response.data._id;
            // todo value of current user needs to be updated within session cookie as well as in database (database is fine_
            // todo need to change user in session cookie, maybe also check Jose lecture from monday
            setCurrentUser(response.data);
        } catch (e) {
            // navigate("/");
        }
    }

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <li className="list-group-item">
            <Link to={`/album/details/${review.albumId}`}>
                <img src={review.albumCover} className="float-start m-2 me-4" height="120px"/>
            </Link>
            <div className="mt-2">
                { currentUser._id === review.reviewerId &&
                    <i onClick={handleDeleteReview} className="fas fa-lg fa-window-close text-muted mt-2 float-end"/>
                }
                <h5 style={{"fontSize": "20px"}}><Link to={`/album/details/${review.albumId}`} style={{ textDecoration: 'none' }} >{review.albumName}</Link></h5>
            </div>
            <i className="text-muted">
                Posted on {getDatePosted()} at {getTimePosted()}</i>
            <br/>
            "{review.review}"
            <br/>
            - {formatReviewer()}
        </li>
    );
};

export default HomeReviewItem;