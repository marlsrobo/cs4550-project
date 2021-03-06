import HomeReviewItem from "./HomeReviewItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {findAllReviews} from "../Actions/album-reviews-actions";

const HomeReviewList = () => {
    const reviews = useSelector(state => state.reviews);
    const dispatch = useDispatch();
    useEffect(() => {findAllReviews(dispatch)}, []);

    const formatReviews = () => {
        try {
            return reviews.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
                .map(review => <HomeReviewItem review={review}/>);
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

export default HomeReviewList;