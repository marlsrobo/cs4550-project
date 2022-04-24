import mongoose from "mongoose";
import artistsSchema from "./artists-schema.js";
const artistsModel = mongoose.model(
    'ArtistsModel',
    artistsSchema
)
export default artistsModel;