import albumReviewsModel from "./album-reviews-model.js";

export const postAlbumReview = async (userId, albumId, review) => {
    review.albumID = albumId;
    const actualReview = await albumReviewsModel.create(review);
    return actualReview;
}

export const findReviewsByAlbumId = (albumId) =>
    albumReviewsModel.find({albumId})

export const findAllAlbumReviews = () => albumReviewsModel.find({});

export const findReviewsByUserId = (userId) =>
    albumReviewsModel.find({reviewerId: userId})

export const deleteReviewsByUserId = (userId) => {
    return albumReviewsModel.deleteMany({reviewerId: userId})
}

export const deleteReviewsByReviewId = (reviewId) => {
    return albumReviewsModel.deleteOne({_id: reviewId})
}