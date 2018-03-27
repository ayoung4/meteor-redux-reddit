import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { lifecycle, withReducer } from 'recompose';
import { bindActionCreators } from 'redux';
import { setReady } from './actions';

interface ISubscriptionMap {
    [subName: string]: {
        handle: Meteor.SubscriptionHandle;
        computation: Tracker.Computation;
    };
}

enum subscriptionMessages {
    SUBSCRIBE = 'SUBSCRIBE',
    UNSUBSCRIBE = 'UNSUBSCRIBE',
}

interface ISubscriptionAction {
    type: subscriptionMessages;
    payload: {
        subscriptionName: string;
        handle?: Meteor.SubscriptionHandle;
        computation: Tracker.Computation;
    };
}

const subscriptionReducer: (state: ISubscriptionMap, action: ISubscriptionAction) => ISubscriptionMap
    = (state = {}, action) => {
        const { subscriptionName } = action.payload;
        switch (action.type) {
            case subscriptionMessages.SUBSCRIBE:
                const { handle, computation } = action.payload;
                return _.extend(state, {
                    [subscriptionName]: {
                        computation, handle,
                    },
                });
            case subscriptionMessages.UNSUBSCRIBE:
                return _.omit(state, [subscriptionName]);
            default:
                return state;
        }
    };

export const withSubscriptions = lifecycle({

});

export const withState = withReducer('subscriptions', 'dispatch', subscriptionReducer, {});

