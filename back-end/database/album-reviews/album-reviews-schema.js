import mongoose from "mongoose";
const albumReviewsSchema = mongoose.Schema({
    review: String,
    albumId: String,
    albumName: String,
    albumCover: String,
    reviewerEmail: String,
    datePosted: Date,
    reviewerName: String,
    reviewerId: String
}, {collection: 'albumReviews'})

export default albumReviewsSchema;