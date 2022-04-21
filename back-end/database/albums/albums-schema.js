import mongoose from "mongoose";
const albumsSchema = mongoose.Schema({
    name: String,
    artists: String,
    albumId: String,
    albumCover: String,
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
}, {collection: 'albums'})

export default albumsSchema;