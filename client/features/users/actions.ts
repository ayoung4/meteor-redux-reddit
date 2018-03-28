import { userActionTypes } from './constants';

export const signUp = ({username, password, handleError, handleSuccess}) => ({
    payload: {
        password,
        username,
        handleError,
        handleSuccess,
    },
    type: userActionTypes.SIGN_UP,
});




export const logIn = ({username, password, handleError, handleSuccess}) => ({
    payload: {
        password,
        username,
        handleError,
        handleSuccess,
    },
    type: userActionTypes.LOG_IN,
});
