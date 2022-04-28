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

export const removeLikeRecord = async (userId, albumId) => {
    return albumLikesDislikesModel.deleteOne({user: userId, albumId: albumId, likedOrDisliked: "liked"});
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

export const removeDislikeRecord = async (userId, albumId) => {
    return albumLikesDislikesModel.deleteOne({user: userId, albumId: albumId, likedOrDisliked: "disliked"});
}

export const findDislikedAlbumsByUserId = (userId) =>
    albumLikesDislikesModel.find({user: userId, likedOrDisliked: "disliked"})
