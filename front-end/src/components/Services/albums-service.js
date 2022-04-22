import axios from 'axios';
const ALBUMS_API = `http://localhost:4000/api/albums`;

const api = axios.create({
    withCredentials: true
});

export const findAlbumById = async (albumId) => {
    const response = await api.get(`${ALBUMS_API}/${albumId}`);
    return response.data;
}

export const likeAlbum = async (album) => {
    const response = await api.post(`${ALBUMS_API}/likes`, album);
    return response.data;
}

export const addAlbumToUserLikes = async (albumId, userId) => {
    const response = await api.post(`${ALBUMS_API}/${albumId}/likes/${userId}`);
    return response.data;
}

export const dislikeAlbum = async (album) => {
    const response = await api.post(`${ALBUMS_API}/dislikes`, album);
    return response.data;
}

export const addAlbumToUserDislikes = async (albumId, userId) => {
    const response = await api.post(`${ALBUMS_API}/${albumId}/dislikes/${userId}`);
    return response.data;
}

export const postAlbumReview = async (userId, albumId, review) => {
    const response = await api.post(`${ALBUMS_API}/${albumId}/reviews/${userId}`, review);
    return response.data;
}

export const findAlbumReviewsByAlbumId = async (albumId) => {
    const response = await api.get(`${ALBUMS_API}/${albumId}/reviews`);
    return response.data;
}

export const findAlbumReviewsByUserId = async (userId) => {
    const response = await api.get(`${ALBUMS_API}/${userId}/reviews`);
    return response.data;
}