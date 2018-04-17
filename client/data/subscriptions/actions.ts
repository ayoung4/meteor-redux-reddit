import { Publication } from 'Lib/publications';
import { Minimongo } from 'Services/Minimongo';

import { subscriptionActionTypes } from './constants';

interface ISubscribeArgs<T, A> {
    publication: Publication<T, A>;
    subscriptionArgs: A;
}

export const subscribe = <T, A>({ publication, subscriptionArgs }: ISubscribeArgs<T, A>) =>
    (dispatch) => {
        const handle = publication.subscribe(subscriptionArgs);
        const computation = Minimongo.connectSubscription(
            handle, 
            (ready) => dispatch(setSubscriptionReady({
                publicationName: publication.name,
                ready,
            })),
        );
        dispatch(startSubscription({
            computation,
            handle,
            publicationName: publication.name,
        }));
        return handle;
    };

const setSubscriptionReady = ({ publicationName, ready }) => ({
    payload: {
        publicationName,
        ready,
    },
    type: subscriptionActionTypes.SET_SUBSCRIPTION_READY,
});

interface IStartSubscriptionArgs<T, A> {
    computation: Tracker.Computation;
    handle: Meteor.SubscriptionHandle;
    publicationName: string;
}

const startSubscription = <T, A>(subscriptionDetails: IStartSubscriptionArgs<T, A>) => ({
    payload: subscriptionDetails,
    type: subscriptionActionTypes.START_SUBSCRIPTION,
});

export const stopSubscription = <T>({ publication }) => ({
    payload: { publication },
    type: subscriptionActionTypes.STOP_SUBSCRIPTION,
});
