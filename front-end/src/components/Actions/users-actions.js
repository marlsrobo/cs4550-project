import * as service from "../Services/users-service";

export const CREATE_USER = 'CREATE_USER';
export const FIND_ALL_USERS = 'FIND_ALL_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const FIND_USER_BY_ID = 'FIND_USER_BY_ID';

export const findUserById = async (dispatch, id) => {
    const user = await service.findUserById(id);
    dispatch({
        type: FIND_USER_BY_ID,
        user
    });
};

export const createUser = async (dispatch, user) => {
    const newUser = await service.createUser(user);
    dispatch({
        type: CREATE_USER,
        newUser
    });
};

export const findAllUsers = async (dispatch) => {
    const users = await service.findAllUsers();
    dispatch({
        type: FIND_ALL_USERS,
        users
    });
};

export const updateUser = async (dispatch, user) => {
    const status = await service.updateUser(user);
    dispatch({
        type: UPDATE_USER,
        user
    });
};

export const deleteUser = async (dispatch, user) => {
    const response = await service.deleteUser(user);
    dispatch({
        type: DELETE_USER,
        user
    });
};