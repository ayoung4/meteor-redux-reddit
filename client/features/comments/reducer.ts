import { Reducer } from 'redux';
import { commentActionTypes } from './constants';

export type ICommentState = IComment[];

const initialState: ICommentState = [];

export const commentsReducer: Reducer<ICommentState> = (state = initialState, action) => {
    switch (action.type) {
        case commentActionTypes.SET_COMMENTS:
            return action.payload.comments || state;
        default:
            return state;
    }
};
