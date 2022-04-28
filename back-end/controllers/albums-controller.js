import * as albumsDao from "../database/albums/albums-dao.js";

const albumsController = (app) => {
    app.post('/api/albums/likes', likeAlbum);
    app.post('/api/albums/dislikes', dislikeAlbum);
    app.put('/api/albums/:albumId/unlike', unlikeAlbum);
    app.put('/api/albums/:albumId/undislike', undislikeAlbum);
    app.get('/api/albums/:albumId', findAlbumById);
}

const likeAlbum = async (req, res) => {
    let album = req.body;
    album = await albumsDao.likeAlbum(album);
    res.json(album);
}

const unlikeAlbum = async (req, res) => {
    let albumId = req.params.albumId;
    let album = await albumsDao.unlikeAlbum(albumId);
    res.json(album);
}

const dislikeAlbum = async (req, res) => {
    let album = req.body;
    album = await albumsDao.dislikeAlbum(album);
    res.json(album);
}

const undislikeAlbum = async (req, res) => {
    let albumId = req.params.albumId;
    let album = await albumsDao.undislikeAlbum(albumId);
    res.json(album);
}

const findAlbumById = async (req, res) => {
    const albumId = req.params.albumId;
    const album = await albumsDao.findAlbumById(albumId);
    res.json(album);
}

export default albumsController;