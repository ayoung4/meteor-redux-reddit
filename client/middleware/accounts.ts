import { Utils } from 'Client/Utils';
import { userActionTypes } from 'Features/users/constants';
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
    }
};
