import * as albumReviewsDao from "../database/album-reviews/album-reviews-dao.js";

const albumReviewsController = (app) => {
    app.post('/albums/:albumId/reviews/:userId', postReview);
    app.get('/albums/:albumId/reviews', findReviewsByAlbumId);
    app.get('/albums/:userId/reviews', findReviewsByUserId);
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

const findReviewsByUserId = async (req, res) => {
    const userId = req.params.userId;
    const reviews = await albumReviewsDao.findReviewsByUserId(userId);
    res.json(reviews);
}

export default albumReviewsController;