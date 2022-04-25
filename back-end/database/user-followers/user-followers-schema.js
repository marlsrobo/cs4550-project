import mongoose from "mongoose";
const userFollowersSchema = mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersModel'},
    userFollowed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersModel'}
}, {collection: 'userFollowers'})

export default userFollowersSchema;