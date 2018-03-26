import { Tracker } from 'meteor/tracker';
import { syncCollection } from './actions';

export const connect = (collection, store) => {
    Tracker.autorun(() => {
        store.dispatch(syncCollection(collection));
    });
};
