import { apiActionTypes } from 'Features/shared/constants';
import { postActionTypes } from './constants';

export const setPosts = (posts: IPost[]) => ({
    type: postActionTypes.SET_POSTS,
    payload: {
        posts,
    },
});

export const fetchPosts = (selector: Mongo.Selector = {}) => ({
    type: apiActionTypes.API,
    payload: {
        args: selector,
        err: (err: Error) => console.log(err),
        methodName: 'posts.get',
        success: setPosts,
    },
});

export const addPost = (title: string, text: string) => ({
    type: postActionTypes.ADD_POST,
    payload: {
        args: {
            title,
            text,
        },
        err: (err: Error) => console.log(err),
        methodName: 'posts.add',
        success: fetchPosts,
    },
});

export const removePost = (_id: string) => ({
    type: postActionTypes.REMOVE_POST,
    payload: {
        args: {
            _id,
        },
        err: (err: Error) => console.log(err),
        methodName: 'posts.remove',
        success: fetchPosts,
    },
});
