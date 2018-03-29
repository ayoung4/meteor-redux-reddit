import { userActionTypes } from './constants';

export const signUp = ({ username, password, handleError, handleSuccess }) => ({
    payload: {
        handleError,
        handleSuccess,
        password,
        username,
    },
    type: userActionTypes.SIGN_UP,
});

export const logIn = ({ username, password, handleError, handleSuccess }) => ({
    payload: {
        handleError,
        handleSuccess,
        password,
        username,
    },
    type: userActionTypes.LOG_IN,
});
