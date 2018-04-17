import { Utils } from 'Client/Utils';
import * as _ from 'lodash';
import { subscriptionActionTypes } from './constants';

interface ISubscriptionsState {
    [subName: string]: {
        handle: Meteor.SubscriptionHandle;
        computation: Tracker.Computation;
        ready: boolean;
    };
}

export const initialState: ISubscriptionsState = {};

export const subscriptionsReducer = Utils.reducerOf<ISubscriptionsState, subscriptionActionTypes>(
    initialState,
    {
        [subscriptionActionTypes.START_SUBSCRIPTION]: (state, action) => {
            const { computation, publicationName, handle } = action.payload;
            return {
                ...state,
                [publicationName]: {
                    computation,
                    handle,
                    ready: false,
                },
            };
        },
        [subscriptionActionTypes.STOP_SUBSCRIPTION]: (state, action) => {
            const { publication } = action.payload;
            return _.omit(state, publication.name);
        },
        [subscriptionActionTypes.SET_SUBSCRIPTION_READY]: (state, action) => {
            const { publicationName, ready } = action.payload;
            const newPublicationEntry = {
                ...state[publicationName],
                ready,
            };
            return {
                ...state,
                [publicationName]: newPublicationEntry,
            };
        },
    },
);
