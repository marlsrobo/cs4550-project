import * as artistsFollowersDao from "../database/artist-followers/artist-followers-dao.js";
import * as artistsDao from "../database/artists/artists-dao.js";

const artistsController = (app) => {
    app.post('/api/artists/:artistId/follow/:userId', followArtist);
    app.post('/api/artists/:artistId/unfollow/:userId', unfollowArtist);
    app.post('/api/artists/:userId', findFollowedArtistsForUser);
    app.get('/api/artists/:artistId', findArtistById);
}

const followArtist = async (req, res) => {
    const artistId = req.params.artistId;
    const userId = req.params.userId;
    const insertedFollow = await artistsFollowersDao.followArtist(userId, artistId);
    await artistsDao.followArtist(artistId);
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