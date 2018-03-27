import { userActionTypes } from 'client/features/users/constants';
import { Utils } from 'client/Utils';
import { Meteor } from 'meteor/meteor';

export const accounts = ({ dispatch }) => (next) => (action) => {
    if (!(action.type in userActionTypes)) {
        return next(action);
    }
    const { username, password, handleSuccess, handleError } = action.payload;
    switch (action.type) {
        case userActionTypes.SIGN_UP:
            Utils.createUser({ username, password })
                .then((result) => {
                    dispatch(handleSuccess(result));
                })
                .catch((err) => {
                    dispatch(handleError(err));
                });
        case userActionTypes.LOG_IN:
            Utils.loginWithPassword({ username, password })
                .then((result) => {
                    dispatch(handleSuccess(result));
                })
                .catch((err) => {
                    dispatch(handleError(err));
                });
    }
};
