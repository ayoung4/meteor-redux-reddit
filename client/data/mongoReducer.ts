import { combineReducers } from 'redux';
import { collectionReducer } from './collections/reducer';
import { subscriptionsReducer } from './subscriptions/reducer';

export const mongoReducer = combineReducers({
    collections: collectionReducer,
    subscriptions: subscriptionsReducer,
});
