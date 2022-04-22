import {findUserById} from "../Services/users-service";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const AlbumReviewItem = ({review}) => {
    const [reviewer, setReviewer] = useState();
    const getReviewerName = async () => {
        return await findUserById(review.reviewer);
    }
    useEffect(() => {
        getReviewerName().then(reviewer => setReviewer(reviewer));
    }, []);

    const formatReviewer = () => {
        try {
            return <Link to={`/profile/${reviewer._id}`}>{reviewer.firstName} {reviewer.lastName}</Link>;
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

    return (
      <li className="list-group-item">
          Posted on {getDatePosted()} at {getTimePosted()}
          <br/>
          "{review.review}"
          <br/>
          - {formatReviewer()}
      </li>
    );
};

export default AlbumReviewItem;