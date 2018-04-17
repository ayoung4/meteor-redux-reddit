import { Utils } from 'Client/Utils';
import { currentUserActionTypes } from './constants';

export const setCurrentUser = ({ isLoggedIn, _id, role, username, avatar, transition }) => ({
    meta: {
        transition,
    },
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

export const signup = ({ password, username }: ICredentials) =>
    async () => await Utils.createUser({ password, username });

export const login = ({ password, username }: ICredentials) =>
    async () => await Utils.loginWithPassword({ password, username });

export const startlogin = ({ password, username }: ICredentials) => ({
    payload: {
        password,
        username,
    },
    type: currentUserActionTypes.LOG_IN,
});
