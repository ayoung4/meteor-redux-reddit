import { Tracker } from 'meteor/tracker';

import { syncCollection } from 'Data/collections/actions';
import { setCurrentUser } from 'Data/currentUser/actions';

export module Minimongo {

    export const connectCollection = (collection, store) => {
        Tracker.autorun(() => {
            store.dispatch(syncCollection(collection));
        });
    };

    export const connectLoggedInUser = (store) => {
        Tracker.autorun(() => {
            const user = Meteor.user();
            store.dispatch(setCurrentUser({
                _id: !!user ? user._id : undefined,
                avatar: { r: 255, g: 0, b: 0 },
                isLoggedIn: !!user,
                role: 'user',
                username: !!user ? user.username : 'anonymous',
            }));
        });
    };

    export const connectSubscription = (handle: Meteor.SubscriptionHandle, readyCb: (ready: boolean) => void) => {
        return Tracker.autorun(() => {
            readyCb(handle.ready());
        });
    }

}
