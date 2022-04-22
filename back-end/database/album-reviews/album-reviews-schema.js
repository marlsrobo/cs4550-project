import mongoose from "mongoose";
const albumReviewsSchema = mongoose.Schema({
    review: String,
    albumId: String,
    reviewerEmail: String,
    datePosted: Date,
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersModel'}
}, {collection: 'albumReviews'})

export default albumReviewsSchema;