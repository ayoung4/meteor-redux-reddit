import { Reducer } from 'redux';
import { postActionTypes } from './constants';

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
