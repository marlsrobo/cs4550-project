import albumReviewsModel from "./album-reviews-model.js";

export const postAlbumReview = async (userId, albumId, review) => {
    review.reviewer = userId;
    review.albumID = albumId;
    const actualReview = await albumReviewsModel.create(review);
    return actualReview;
}

export const findReviewsByAlbumId = (albumId) =>
    albumReviewsModel.find({albumId})

export const findReviewsByUserId = (userId) =>
    albumReviewsModel.find({reviewer: userId})