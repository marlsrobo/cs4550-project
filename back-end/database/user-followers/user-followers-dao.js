import userFollowersModel from "./user-followers-model.js";

export const followUser = async (followerId, userFollowedId) => {
    const record = {
        follower: followerId,
        userFollowed: userFollowedId
    }
    const actualRecord = await userFollowersModel.create(record);
    return actualRecord;
}

export const unfollowUser = async (followerId, userFollowedId) => {
    return userFollowersModel.deleteOne({follower: followerId, userFollowed: userFollowedId})
}

export const findFollowedUsersForUser = async (followerId) => {
    return userFollowersModel.find({follower: followerId});
}

export const findFollowersForUser = async (userFollowedId) => {
    return userFollowersModel.find({userFollowed: userFollowedId});
}
