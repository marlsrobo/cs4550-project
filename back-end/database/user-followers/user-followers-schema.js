import mongoose from "mongoose";
const artistFollowersSchema = mongoose.Schema({
    artistId: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersModel'}
}, {collection: 'artistFollowers'})

export default artistFollowersSchema;