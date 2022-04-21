import mongoose from "mongoose";
import albumsSchema from "./albums-schema.js";
const albumsModel = mongoose.model(
    'AlbumsModel',
    albumsSchema
)
export default albumsModel;