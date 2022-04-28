import axios from 'axios';

const USERS_API = `http://localhost:4000/api/users`;

const api = axios.create({
    withCredentials: true
});
export const createUser = async (user) => {
    const response = await api.post(USERS_API, user);
    return response.data;
};

export const findAllUsers = async () => {
    const response = await api.get(USERS_API);
    const users = response.data;
    return users;
};

export const deleteUser = async (user) => {
    const response = await api.delete(`${USERS_API}/${user._id}`);
    return response.data;
};

export const updateUser = async (user) => {
    const response = await api.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

export const findUserById = async (id) => {
    const response = await api.get(`${USERS_API}/${id}`);
    return response.data;
};

export const followUser = async (followerId, userFollowedId) => {
    const response = await api.post(`${USERS_API}/${followerId}/follow/${userFollowedId}`);
    return response.data;
}

export const unfollowUser = async (followerId, userFollowedId) => {
    const response = await api.delete(`${USERS_API}/${followerId}/unfollow/${userFollowedId}`);
    return response.status;
}

export const findUsersOfTypeNotFollowingForUser = async (userId, userTypeToSearch) => {
    let allUsers = await findAllUsers();
    let allUsersOfType = allUsers.filter(user => user.userType === userTypeToSearch);
    const allUsersFollowing = await findFollowedUsersForUser(userId);
    const allUsersOfTypeFollowing = allUsersFollowing.filter(user => user.userType === userTypeToSearch);
    const allUsersOfTypeFollowingIds = allUsersOfTypeFollowing.map(critic => critic._id);
    return allUsersOfType.filter(user => !allUsersOfTypeFollowingIds.includes(user._id) && user._id !== userId);
}

export const findFollowedUsersForUser = async (followerId) => {
    const response = await api.get(`${USERS_API}/${followerId}/usersFollowing`);
    return response.data;
}

export const findFollowersForUser = async (userFollowedId) => {
    const response = await api.get(`${USERS_API}/${userFollowedId}/followers`);
    return response.data;
}