import mongoose from "mongoose";
import albumReviewsSchema from "./album-reviews-schema.js";
const albumReviewsModel = mongoose.model(
    'AlbumReviewsModel',
    albumReviewsSchema
)
export default albumReviewsModel;