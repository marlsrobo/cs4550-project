import {UPDATE_USER, CREATE_USER, DELETE_USER, FIND_ALL_USERS} from "../Actions/users-actions";

const UsersReducer = (state = [], action) => {
    switch (action.type) {
        case FIND_ALL_USERS:
            return action.users;
        case DELETE_USER:
            return state.filter(user => user._id !== action.user._id);
        case CREATE_USER:
            return [
                action.newUser,
                ...state
            ];
        case UPDATE_USER:
            return state.map(user => user._id === action.user._id ? action.user : user);
        default:
            return state;
    }
}

export default UsersReducer;