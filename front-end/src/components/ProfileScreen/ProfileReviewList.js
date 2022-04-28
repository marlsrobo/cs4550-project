import AlbumReviewItem from "../SearchScreen/AlbumReviewItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {findReviewsByUserId} from "../Actions/album-reviews-actions";

const ProfileReviewList = ({userId}) => {
    const reviews = useSelector(state => state.reviews);
    const dispatch = useDispatch();
    useEffect(() => {findReviewsByUserId(dispatch, userId)}, []);

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

export default ProfileReviewList;