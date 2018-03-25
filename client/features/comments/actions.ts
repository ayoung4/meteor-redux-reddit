import { apiActionTypes } from 'Features/shared/constants';
import { commentActionTypes } from './constants';

export const setComments = (comments: IComment[]) => ({
    type: commentActionTypes.SET_COMMENTS,
    payload: {
        comments,
    },
});

export const fetchComments = (selector: Mongo.Selector = {}) => ({
    type: apiActionTypes.API,
    payload: {
        args: selector,
        err: (err: Error) => console.log(err),
        methodName: 'comments.get',
        success: setComments,
    },
});