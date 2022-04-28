import axios from 'axios';
const ALBUMS_API = `http://localhost:4000/api/albums`;
const USERS_API = `http://localhost:4000/api/users`;


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

export const unlikeAlbum = async (userId, albumId) => {
    const response = await api.put(`${ALBUMS_API}/${albumId}/unlike`);
    await api.delete(`${ALBUMS_API}/${albumId}/likes/${userId}`)
    return response.data;
}

export const addAlbumToUserLikes = async (albumId, userId) => {
    const response = await api.post(`${ALBUMS_API}/${albumId}/likes/${userId}`);
    return response.data;
}

export const findLikedAlbumsByUserId = async (userId) => {
    const response = await api.get(`${ALBUMS_API}/${userId}/likes`);
    return response.data;
}

export const dislikeAlbum = async (album) => {
    const response = await api.post(`${ALBUMS_API}/dislikes`, album);
    return response.data;
}

export const undislikeAlbum = async (userId, albumId) => {
    const response = await api.put(`${ALBUMS_API}/${albumId}/undislike`);
    await api.delete(`${ALBUMS_API}/${albumId}/dislikes/${userId}`)
    return response.data;
}

export const addAlbumToUserDislikes = async (albumId, userId) => {
    const response = await api.post(`${ALBUMS_API}/${albumId}/dislikes/${userId}`);
    return response.data;
}

export const findDislikedAlbumsByUserId = async (userId) => {
    const response = await api.get(`${ALBUMS_API}/${userId}/dislikes`);
    return response.data;
}

export const postAlbumReview = async (userId, albumId, review) => {
    const response = await api.post(`${ALBUMS_API}/${albumId}/reviews/${userId}`, review);
    return response.data;
}

export const findAllAlbumReviews = async () => {
    const response = await api.get(`http://localhost:4000/api/albums-reviews`);
    return response.data;
}

export const findAlbumReviewsByAlbumId = async (albumId) => {
    const response = await api.get(`${ALBUMS_API}/${albumId}/reviews`);
    return response.data;
}

export const findAlbumReviewsByUserId = async (userId) => {
    const response = await api.get(`${USERS_API}/${userId}/reviews`);
    return response.data;
}