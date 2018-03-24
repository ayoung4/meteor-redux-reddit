import { apiActionTypes } from 'Features/shared/constants';

export const api = ({ dispatch, getState }) => (next) => (action) => {
    if (action.type !== apiActionTypes.API) {
        return next(action);
    }
    Meteor.call(action.payload.methodName, ...action.payload.args, (err: Error, result: any) => {
        if (!!result && !err) {
            dispatch(action.payload.success(result));
        } else {
            dispatch(action.payload.err(err));
        }
    });
};
