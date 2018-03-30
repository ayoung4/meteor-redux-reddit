import { Tracker } from 'meteor/tracker';
import { setLoggedInUser, syncCollection } from './actions';

export const connectCollection = (collection, store) => {
    Tracker.autorun(() => {
        store.dispatch(syncCollection(collection));
    });
};

export const connectLoggedInUser = (store) => {
    Tracker.autorun(() => {
        const user = Meteor.user();
        store.dispatch(setLoggedInUser({
            _id: !!user ? user._id : undefined,
            avatar: { r: 255, g: 0, b: 0 },
            isLoggedIn: !!user,
            role: 'user',
            username: !!user ? user.username : undefined,
        }));
    });
};
