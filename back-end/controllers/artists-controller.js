import * as artistsFollowersDao from "../database/artist-followers/artist-followers-dao.js";
import * as artistsDao from "../database/artists/artists-dao.js";

const artistsController = (app) => {
    app.post('/api/artists/:artistId', createArtist);
    app.post('/api/artists/:artistId/follow/:userId', followArtist);
    app.delete('/api/artists/:artistId/unfollow/:userId', unfollowArtist);
    app.get('/api/artists/:userId', findFollowedArtistsForUser);
    app.get('/api/artists/:artistId', findArtistById);
}

const createArtist = async (req, res) => {
    const artist = req.body;
    const insertedArtist = await artistsDao.createArtist(artist);
    res.json(insertedArtist);
}

const followArtist = async (req, res) => {
    const artistId = req.params.artistId;
    const userId = req.params.userId;
    const insertedFollow = await artistsFollowersDao.followArtist(userId, artistId);
    res.json(insertedFollow);
}

const unfollowArtist = async (req, res) => {
    const artistId = req.params.artistId;
    const userId = req.params.userId;
    try {
        await artistsFollowersDao.unfollowArtist(userId, artistId);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
}

const findArtistById = async (req, res) => {
    const artistId = req.params.artistId;
    const artist = await artistsDao.findArtistById(artistId);
    res.json(artist);
}

const findFollowedArtistsForUser = async (req, res) => {
    const userId = req.params.userId;
    const recordsInArtistFollowers = await artistsFollowersDao.findFollowedArtistsForUser(userId);
    let artists = [];
    for (const record of recordsInArtistFollowers) {
        const artist = await artistsDao.findArtistById(record.artistId);
        artists.push(artist);
    }
    res.json(artists);
}

export default artistsController;