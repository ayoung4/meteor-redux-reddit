import { Tracker } from 'meteor/tracker';
import { syncCollection } from './actions';

export const connectCollection = (collection, store) => {
    Tracker.autorun(() => {
        store.dispatch(syncCollection(collection));
    });
};
