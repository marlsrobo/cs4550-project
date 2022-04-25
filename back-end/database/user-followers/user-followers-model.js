import mongoose from "mongoose";
import userFollowersSchema from "./user-followers-schema.js";
const userFollowersModel = mongoose.model(
    'UserFollowersModel',
    userFollowersSchema
)
export default userFollowersModel;