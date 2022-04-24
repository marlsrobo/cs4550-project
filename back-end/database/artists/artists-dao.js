import artistsModel from "./artists-model.js";

export const createArtist = async (artist) => {
    return await artistsModel.create(artist);
}

export const findArtistById = async (artistId) => {
    return artistsModel.findOne({artistId});
};