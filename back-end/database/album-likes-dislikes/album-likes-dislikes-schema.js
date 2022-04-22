import mongoose from "mongoose";
const albumLikesDislikesSchema = mongoose.Schema({
    albumId: String,
    likedOrDisliked: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersModel'}
}, {collection: 'albumLikesDislikes'})

export default albumLikesDislikesSchema;