import { apiActionTypes } from 'Features/shared/constants';
import { commentActionTypes } from './constants';

export const setComments = (comments: IComment[]) => ({
    payload: {
        comments,
    },
    type: commentActionTypes.SET_COMMENTS,
});

export const fetchComments = (selector: Mongo.Selector = {}) => ({
    payload: {
        args: selector,
        err: (err: Error) => console.log(err),
        methodName: 'comments.get',
        success: setComments,
    },
    type: apiActionTypes.API,
});
