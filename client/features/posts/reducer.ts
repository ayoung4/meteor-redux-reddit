import { postActionTypes } from './constants';
import { Reducer } from 'redux';

export type IPostsState = IPost[];

const initialState: IPostsState = [];

export const postsReducer: Reducer<IPostsState> = (state = initialState, action) => {
    switch (action.type) {
        case postActionTypes.SET_POSTS:
            return action.payload.posts || state;
        default:
            return state;
    }
};
