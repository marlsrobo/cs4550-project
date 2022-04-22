import albumLikesDislikesModel from "./album-likes-dislikes-model.js";
import mongoose from "mongoose";

export const likeAlbum = async (userId, albumId) => {
    const record = {
        albumId: albumId,
        likedOrDisliked: "liked",
        user: userId
    }
    const actualRecord = await albumLikesDislikesModel.create(record);
    return actualRecord;
}

export const findLikedAlbumsByUserId = (userId) =>
    albumLikesDislikesModel.find({user: userId, likedOrDisliked: "liked"})

export const dislikeAlbum = async (userId, albumId) => {
    const record = {
        albumId: albumId,
        likedOrDisliked: "disliked",
        user: userId
    }
    const actualRecord = await albumLikesDislikesModel.create(record);
    return actualRecord;
}

export const findDislikedAlbumsByUserId = (userId) =>
    albumLikesDislikesModel.find({user: userId, likedOrDisliked: "disliked"})
