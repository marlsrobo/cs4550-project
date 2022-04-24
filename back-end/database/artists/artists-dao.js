import artistsModel from "./artists-model.js";

export const createArtist = async (artist) => {
    return await artistsModel.create(artist);
}

export const findArtistById = async (artistId) => {
    console.log("searching for artist");
    return artistsModel.findOne({artistId: artistId});
};