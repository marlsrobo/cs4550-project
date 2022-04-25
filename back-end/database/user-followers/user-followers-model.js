import mongoose from "mongoose";
import artistFollowersSchema from "./artist-followers-schema.js";
const artistFollowersModel = mongoose.model(
    'ArtistFollowersModel',
    artistFollowersSchema
)
export default artistFollowersModel;