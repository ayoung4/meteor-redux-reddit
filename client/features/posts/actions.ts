import { apiActionTypes } from 'Features/shared/constants';
import { postActionTypes } from './constants';

export const setPosts = (posts: IPost[]) => ({
    payload: {
        posts,
    },
    type: postActionTypes.SET_POSTS,
});

export const fetchPosts = (selector: Mongo.Selector = {}) => ({
    payload: {
        args: selector,
        err: (err: Error) => console.log(err),
        methodName: 'posts.get',
        success: setPosts,
    },
    type: apiActionTypes.API,
});

export const addPost = (title: string, text: string) => ({
    payload: {
        args: {
            text,
            title,
        },
        err: (err: Error) => console.log(err),
        methodName: 'posts.add',
        success: fetchPosts,
    },
    type: postActionTypes.ADD_POST,
});

export const removePost = (_id: string) => ({
    payload: {
        args: {
            _id,
        },
        err: (err: Error) => console.log(err),
        methodName: 'posts.remove',
        success: fetchPosts,
    },
    type: postActionTypes.REMOVE_POST,
});
