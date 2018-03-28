import * as _ from 'lodash';
import { combineReducers } from 'redux';
import { minimongoActionTypes } from './actions';

const collectionReducer = (state = {}, action) => {
    switch (action.type) {
        case minimongoActionTypes.SET_MONGO_COLLECTION:
            const oldDocs = state[action.payload.name] || [];
            return {
                ...state,
                [action.payload.name]: _.concat(action.payload.docs, oldDocs),
            };
        default:
            return state;
    }
};

const readyReducer = (state = {}, action) => {
    switch (action.type) {
        case minimongoActionTypes.SET_MONGO_COLLECTION_READY_STATE:
            return {
                ...state,
                [action.payload.name]: action.payload.ready,
            };
        default:
            return state;
    }
};

export const mongoReducer = combineReducers({
    collections: collectionReducer,
    collectionsReady: readyReducer,
});
