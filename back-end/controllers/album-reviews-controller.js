import * as albumReviewsDao from "../database/album-reviews/album-reviews-dao.js";

const albumReviewsController = (app) => {
    app.post('/api/albums/:albumId/reviews/:userId', postReview);
    app.get('/api/albums/:albumId/reviews', findReviewsByAlbumId);
    app.get('/api/albums-reviews', findAlbumReviews);
    app.get('/api/users/:userId/reviews', findReviewsByUserId);
    app.delete('/api/users/:userId/reviews', deleteReviewsByUserId);
    app.delete('/api/reviews/:reviewId', deleteReviewsByReviewId);

}

const postReview = async (req, res) => {
    const review = req.body;
    const albumId = req.params.albumId;
    const userId = req.params.userId;
    const insertedReview = await albumReviewsDao.postAlbumReview(userId, albumId, review);
    res.json(insertedReview);
}

const findReviewsByAlbumId = async (req, res) => {
    const albumId = req.params.albumId;
    const reviews = await albumReviewsDao.findReviewsByAlbumId(albumId);
    res.json(reviews);
}

const findAlbumReviews = async (req, res) => {
    const reviews = await albumReviewsDao.findAllAlbumReviews();
    res.json(reviews);
}

const findReviewsByUserId = async (req, res) => {
    const userId = req.params.userId;
    const reviews = await albumReviewsDao.findReviewsByUserId(userId);
    res.json(reviews);
}

const deleteReviewsByUserId = async (req, res) => {
    console.log("deleting reviews for user")
    const userId = req.params.userId;
    console.log(userId)
    const status = await albumReviewsDao.deleteReviewsByUserId(userId);
    res.json(status);
}

const deleteReviewsByReviewId = async (req, res) => {
    console.log("deleting reviews for user")
    const reviewId = req.params.reviewId;
    console.log(reviewId)
    const status = await albumReviewsDao.deleteReviewsByReviewId(reviewId);
    res.json(status);
}

export default albumReviewsController;