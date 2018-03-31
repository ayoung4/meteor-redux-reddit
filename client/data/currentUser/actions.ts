import { currentUserActionTypes } from './constants';

export const setCurrentUser = ({ isLoggedIn, _id, role, username, avatar }) => ({
    payload: {
        avatar,
        isLoggedIn,
        meta: {
            _id,
            role,
        },
        username,
    },
    type: currentUserActionTypes.SET_CURRENT_USER,
});
