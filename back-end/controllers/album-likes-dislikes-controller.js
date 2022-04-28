import * as albumLikesDislikesDao from "../database/album-likes-dislikes/album-likes-dislikes-dao.js";
import {findAlbumById} from "../database/albums/albums-dao.js";


const albumLikesDislikesController = (app) => {
    app.post('/api/albums/:albumId/likes/:userId', likeAlbum);
    app.post('/api/albums/:albumId/dislikes/:userId', dislikeAlbum);
    app.delete('/api/albums/:albumId/likes/:userId', unlikeAlbum);
    app.delete('/api/albums/:albumId/dislikes/:userId', undislikeAlbum);


    app.get('/api/albums/:userId/likes', findAlbumLikesByUserId);
    app.get('/api/albums/:userId/dislikes', findAlbumDislikesByUserId);
}

const likeAlbum = async (req, res) => {
    const albumId = req.params.albumId;
    const userId = req.params.userId;
    const insertedLike = await albumLikesDislikesDao.likeAlbum(userId, albumId);
    res.json(insertedLike);
}

const unlikeAlbum = async (req, res) => {
    const userId = req.params.userId;
    const albumId = req.params.albumId;
    const status = await albumLikesDislikesDao.removeLikeRecord(userId, albumId);
    res.json(status);
}

const dislikeAlbum = async (req, res) => {
    const albumId = req.params.albumId;
    const userId = req.params.userId;
    const insertedDislike = await albumLikesDislikesDao.dislikeAlbum(userId, albumId);
    res.json(insertedDislike);
}

const undislikeAlbum = async (req, res) => {
    const userId = req.params.userId;
    const albumId = req.params.albumId;
    const status = await albumLikesDislikesDao.removeDislikeRecord(userId, albumId);
    res.json(status);
}

const findAlbumLikesByUserId = async (req, res) => {
    const userId = req.params.userId;
    const likedAlbums = await albumLikesDislikesDao.findLikedAlbumsByUserId(userId);
    let actualAlbumObjects = [];
    for (const album of likedAlbums) {
        const actualAlbum = await findAlbumById(album.albumId);
        actualAlbumObjects.push(actualAlbum);
    }
    res.json(actualAlbumObjects);
}

const findAlbumDislikesByUserId = async (req, res) => {
    const userId = req.params.userId;
    const dislikedAlbums = await albumLikesDislikesDao.findDislikedAlbumsByUserId(userId);
    let actualAlbumObjects = [];
    for (const album of dislikedAlbums) {
        const actualAlbum = await findAlbumById(album.albumId);
        actualAlbumObjects.push(actualAlbum);
    }
    res.json(actualAlbumObjects);
}

export default albumLikesDislikesController;