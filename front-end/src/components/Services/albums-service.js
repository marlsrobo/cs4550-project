import axios from 'axios';
const ALBUMS_API = `http://localhost:4000/api/albums`;

const api = axios.create({
    withCredentials: true
});

export const findAlbumById = async (albumId) => {
    const response = await api.get(`${ALBUMS_API}/${albumId}`);
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