import {findAlbumReviewsByUserId} from "../Services/albums-service";
import {findUserById} from "../Services/users-service";
import {useEffect, useState} from "react";

const AlbumReviewItem = ({review}) => {
    const [reviewer, setReviewer] = useState();
    const getReviewerName = async () => {
        const reviewer = await findUserById(review.reviewer);
        console.log(reviewer);
    }
    useEffect(() => {
        getReviewerName().then(reviewer => setReviewer(reviewer));
    }, []);

    const formatReviewer = () => {
        try {
            return (
                <span>
                    {reviewer.firstName} {reviewer.lastName}
                </span>
            );
        } catch (e) {

        }
    }

    return (
      <li className="list-group-item">
          {JSON.stringify(review)}
          "{review.review}"
          <br/>
          - {formatReviewer()}
      </li>
    );
};

export default AlbumReviewItem;