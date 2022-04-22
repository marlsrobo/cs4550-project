import mongoose from "mongoose";
import albumLikesDislikesSchema from "./album-likes-dislikes-schema.js";
const albumLikesDislikesModel = mongoose.model(
    'AlbumLikesDislikesModel',
    albumLikesDislikesSchema
)
export default albumLikesDislikesModel;