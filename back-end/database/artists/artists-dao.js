import artistsModel from "./artists-model.js";

export const followArtist = async (artist) => {
    let existingAlbum = await artistsModel.findOne({albumId: album.albumId})
    if(existingAlbum) {
        // update
        await artistsModel.updateOne({albumId: album.albumId}, {
            $set: {likes: existingAlbum.likes + 1}
        })
        existingAlbum.likes++;
    } else {
        // insert
        try {
            existingAlbum = await artistsModel.create({
                ...album,
                likes: 1,
                dislikes: 0
            })
        } catch(e) {
            console.log(e)
        }
    }
    return existingAlbum;
};

export const unfollowArtist = async (album) => {
    let existingAlbum = await artistsModel.findOne({albumId: album.albumId})
    if(existingAlbum) {
        // update
        await artistsModel.updateOne({albumId: album.albumId}, {
            $set: {dislikes: existingAlbum.dislikes + 1}
        })
        existingAlbum.dislikes++;
    } else {
        // insert
        try {
            existingAlbum = await artistsModel.create({
                ...album,
                likes: 0,
                dislikes: 1
            })
        } catch(e) {
            console.log(e)
        }
    }
    return existingAlbum;
};

export const findArtistById = async (artistId) => {
    const artist = await artistsModel.findOne({artistId});
    return artist;
};