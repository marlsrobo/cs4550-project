import artistFollowersModel from "./artist-followers-model.js";

export const followArtist = async (userId, artistId) => {
    const record = {
        artistId: artistId,
        user: userId
    }
    const actualRecord = await artistFollowersModel.create(record);
    return actualRecord;
}

export const unfollowArtist = async (userId, artistId) => {
    artistFollowersModel.remove({user: userId, artistId: artistId})
}

export const findFollowedArtistsForUser = async (userId) => {
    return artistFollowersModel.find({user: userId});
}
