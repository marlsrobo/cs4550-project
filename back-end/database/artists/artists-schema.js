import mongoose from "mongoose";
const artistsSchema = mongoose.Schema({
    name: String,
    artistId: String,
    profilePic: String,
}, {collection: 'artists'})

export default artistsSchema;