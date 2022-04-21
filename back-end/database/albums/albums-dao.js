import albumsModel from "./albums-model.js";

export const likeAlbum = async (album) => {
    let existingAlbum = await albumsModel.findOne({albumId: album.albumId})
    if(existingAlbum) {
        // update
        await albumsModel.updateOne({albumId: album.albumId}, {
            $set: {likes: existingAlbum.likes + 1}
        })
        existingAlbum.likes++;
    } else {
        // insert
        try {
            existingAlbum = await albumsModel.create({
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

export const dislikeAlbum = async (album) => {
    let existingAlbum = await albumsModel.findOne({albumId: album.albumId})
    if(existingAlbum) {
        // update
        await albumsModel.updateOne({albumId: album.albumId}, {
            $set: {dislikes: existingAlbum.dislikes + 1}
        })
        existingAlbum.dislikes++;
    } else {
        // insert
        try {
            existingAlbum = await albumsModel.create({
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

export const findAlbumById = async (albumId) => {
    const album = await albumsModel.findOne({albumId});
    return album;
};