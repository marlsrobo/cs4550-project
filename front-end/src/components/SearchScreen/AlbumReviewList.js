import AlbumReviewItem from "./AlbumReviewItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {findAllReviews, findReviewsByAlbumId} from "../Actions/album-reviews-actions";

const AlbumReviewList = ({albumId}) => {
    const reviews = useSelector(state => state.reviews);
    const dispatch = useDispatch();
    useEffect(() => {findReviewsByAlbumId(dispatch, albumId)}, []);

    const formatReviews = () => {
        try {
            return reviews.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
                .map(review => <AlbumReviewItem review={review}/>);
        } catch (e) {

        }
    }

    return (
      <ul className="list-group">
          {/*{JSON.stringify(reviews)}*/}
          {formatReviews()}
      </ul>
    );
};

export default AlbumReviewList;