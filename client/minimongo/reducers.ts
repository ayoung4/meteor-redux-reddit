import { Utils } from 'Client/Utils';
import * as _ from 'lodash';
import { combineReducers } from 'redux';
import { Reducer } from 'redux';
import { minimongoActionTypes } from './actions';
import { avatarFromLocalData, newAvatarInLocalData } from './avatar';

interface ICollectionsState {
    comments?: IComment[];
    posts?: IPost[];
    users?: IUser[];
}

const collectionReducer = Utils.reducerOf<ICollectionsState, minimongoActionTypes>({}, {
    [minimongoActionTypes.SET_MONGO_COLLECTION]: (state, action) => ({
        ...state,
        [action.payload.name]: action.payload.docs,
    }),
});

export interface ILoggedInUserState {
    avatar: { r: number; g: number; b: number; };
    isLoggedIn: boolean;
    meta?: {
        _id: string;
        role: string;
    };
    username: string;
}

const initialState: ILoggedInUserState = {
    avatar: avatarFromLocalData() || newAvatarInLocalData(),
    isLoggedIn: false,
    username: 'anonymous',
};

export const loggedInUserReducer = Utils.reducerOf<ILoggedInUserState, minimongoActionTypes>(
    initialState,
    {
        [minimongoActionTypes.SET_LOGGED_IN_USER]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
);

export const mongoReducer = combineReducers({
    collections: collectionReducer,
});

// Currently Unused:

// collectionsReady: readyReducer,

// type collectionReadyState = any;

// interface ICollectionsReadyState {
//     comments?: collectionReadyState;
//     posts?: collectionReadyState;
//     users?: collectionReadyState;
// }

// const readyReducer = reducerOf<ICollectionsReadyState, minimongoActionTypes>({}, {
//     [minimongoActionTypes.SET_MONGO_COLLECTION_READY_STATE]: (state, action) => ({
//         ...state,
//         [action.payload.name]: action.payload.ready,
//     }),
// });
