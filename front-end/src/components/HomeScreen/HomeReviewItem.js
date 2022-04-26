import {findUserById} from "../Services/users-service";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const api = axios.create({
    withCredentials: true
});

const HomeReviewItem = ({review, reviewList}) => {
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
                const deleteUserReviews = await api.delete(`http://localhost:4000/api/reviews/${review._id}`)
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
            <div>
                { currentUser._id === review.reviewerId &&
                    <i onClick={handleDeleteReview} className="fas fa-lg fa-window-close text-muted mt-2 float-end"/>
                }
                <h5 style={{"fontSize": "20px"}}><Link to={`/album/details/${review.albumId}`}>{review.albumName}</Link></h5>
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