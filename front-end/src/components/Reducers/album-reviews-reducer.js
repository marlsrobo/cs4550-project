import {DELETE_REVIEW, CREATE_REVIEW, FIND_ALL_REVIEWS, FIND_REVIEWS_BY_USER_ID, FIND_REVIEWS_BY_ALBUM_ID} from "../Actions/album-reviews-actions";

const AlbumReviewsReducer = (state = [], action) => {
    switch (action.type) {
        case FIND_ALL_REVIEWS:
            return action.reviews;
        case DELETE_REVIEW:
            return state.filter(review => review._id !== action.review._id);
        case CREATE_REVIEW:
            return [
                action.newReview,
                ...state
            ];
        case FIND_REVIEWS_BY_USER_ID:
            return action.reviews;
        case FIND_REVIEWS_BY_ALBUM_ID:
            return action.reviews;
        default:
            return state;
    }
}

export default AlbumReviewsReducer;