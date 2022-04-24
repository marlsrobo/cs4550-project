import axios from 'axios';
const ARTISTS_API = `http://localhost:4000/api/artists`;

const api = axios.create({
    withCredentials: true
});

export const findArtistById = async (artistId) => {
    const response = await api.get(`${ARTISTS_API}/${artistId}`);
    console.log(response.data);
    return response.data;
}

export const followArtist = async (userId, artistId) => {
    const response = await api.post(`${ARTISTS_API}/${artistId}/follow/${userId}`);
    return response.data;
}

export const unfollowArtist = async (userId, artistId) => {
    const response = await api.delete(`${ARTISTS_API}/${artistId}/unfollow/${userId}`);
    return response.status;
}

export const findFollowedArtistsForUser = async (userId) => {
    const response = await api.get(`${ARTISTS_API}/${userId}/following`);
    return response.data;
}

export const createArtist = async (artist) => {
    const response = await api.post(`${ARTISTS_API}/${artist.artistId}`, artist);
    return response.data;
}