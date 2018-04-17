import { Utils } from 'Client/Utils';

import { minimongoActionTypes } from './constants';

export const initialState: ICollectionsState = {
    comments: [],
    posts: [],
    users: [],
};

export const collectionReducer = Utils.reducerOf<ICollectionsState, minimongoActionTypes>(
    initialState,
    {
        [minimongoActionTypes.SET_MONGO_COLLECTION]: (state, action) => ({
            ...state,
            [action.payload.name]: action.payload.docs,
        }),
    },
);
