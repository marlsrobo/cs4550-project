import * as service from "../Services/albums-service";

export const CREATE_REVIEW = 'CREATE_REVIEW';
export const FIND_ALL_REVIEWS = 'FIND_ALL_REVIEWS';
export const DELETE_REVIEW = 'DELETE_REVIEW';
export const FIND_REVIEWS_BY_ALBUM_ID = 'FIND_REVIEWS_BY_ALBUM_ID';
export const FIND_REVIEWS_BY_USER_ID = 'FIND_REVIEWS_BY_USER_ID';

export const findReviewsByAlbumId = async (dispatch, id) => {
    const reviews = await service.findAlbumReviewsByAlbumId(id);
    dispatch({
        type: FIND_REVIEWS_BY_ALBUM_ID,
        reviews
    });
};

export const findReviewsByUserId = async (dispatch, id) => {
    const reviews = await service.findAlbumReviewsByUserId(id);
    dispatch({
        type: FIND_REVIEWS_BY_USER_ID,
        reviews
    });
};

export const postReview = async (dispatch, review) => {
    console.log("posting review");
    console.log(review);
    const newReview = await service.postAlbumReview(review.reviewerId, review.albumId, review);
    dispatch({
        type: CREATE_REVIEW,
        newReview
    });
};

export const findAllReviews = async (dispatch) => {
    const reviews = await service.findAllAlbumReviews();
    // console.log(reviews);
    dispatch({
        type: FIND_ALL_REVIEWS,
        reviews
    });
};

export const deleteReview = async (dispatch, review) => {
    const response = await service.deleteUserReview(review);
    dispatch({
        type: DELETE_REVIEW,
        review
    });
};