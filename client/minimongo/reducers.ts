import * as _ from 'lodash';
import { combineReducers } from 'redux';
import { minimongoActionTypes } from './actions';

const collectionReducer = (state = {}, action) => {
    switch (action.type) {
        case minimongoActionTypes.SET_MONGO_COLLECTION:
            const { collectionName, docs } = action.payload;
            return _.extend(state, { [action.payload.name]: action.payload.docs });
        default:
            return state;
    }
};

const readyReducer = (state = {}, action) => {
    switch (action.type) {
        case minimongoActionTypes.SET_MONGO_COLLECTION_READY_STATE:
            const { collectionName, ready } = action.payload;
            return _.extend(state, { [action.payload.name]: action.payload.ready });
        default:
            return state;
    }
};

export const mongoReducer = combineReducers({
    collections: collectionReducer,
    collectionsReady: readyReducer,
});
