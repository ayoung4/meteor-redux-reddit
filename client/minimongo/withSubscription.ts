import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { ComponentEnhancer, compose, lifecycle, withReducer } from 'recompose';
import { bindActionCreators } from 'redux';
import { setReady } from './actions';

enum subscriptionMessages {
    SUBSCRIBE = 'SUBSCRIBE',
    SET_SUBSCRIPTION_READY = 'SET_SUBSCRIPTION_READY',
    UNSUBSCRIBE = 'UNSUBSCRIBE',
}

interface ISubscriptionAction {
    type: subscriptionMessages;
    payload: {
        name: string;
        isReady: boolean;
        handle: Meteor.SubscriptionHandle;
        computation: Tracker.Computation;
    };
}

type subscriptionReducer = (state: ISubscriptionMap, action: ISubscriptionAction) => ISubscriptionMap;

const reducer: subscriptionReducer = (state = {}, action) => {
    const { name } = action.payload;
    console.log(action);
    switch (action.type) {

        case subscriptionMessages.SUBSCRIBE:
            const { handle, computation } = action.payload;
            return {
                ...state,
                [name]: {
                    computation,
                    handle,
                    isReady: false,
                },
            };

        case subscriptionMessages.UNSUBSCRIBE:
            if (!state[name]) {
                return state;
            }
            state[name].handle.stop();
            state[name].computation.stop();
            return _.omit(state, [name]);

        case subscriptionMessages.SET_SUBSCRIPTION_READY:
            const subscriptionState = state[name];
            if (!subscriptionState) {
                return state;
            }
            const { isReady } = action.payload;
            return {
                ...state,
                [name]: _.merge(subscriptionState, { isReady }),
            };

        default:
            return state;

    }
};

// P = proptypes of unenhanced component, ie. { posts: IPost[] }
// S = object passed to enhancer factory, ie. { ['my.subscription']: { _id: '123'} }
// factory returns a component enhancer that takes a component of { posts: IPost[] } as props and 
// returns a component of { posts: IPost[], subscriptions: { ['my.subscription']: ISubscriptionState } }

interface IWithSubscriptionArgs {
    [subName: string]: subscriptionArgs;
}

type ISubscriptionStateProps<S extends IWithSubscriptionArgs> = {
    [subName in keyof S]?: ISubscriptionState;
};

type SubscriptionEnhancerFactory = <P, S extends IWithSubscriptionArgs>(subscriptions: S) =>
    ComponentEnhancer<P, P & ISubscriptionStateProps<S>>;

export const withSubscription: SubscriptionEnhancerFactory = (subscriptions) => {

    const withLifecycle = lifecycle<ISubscriptionProps, ISubscriptionProps>({
        componentDidMount() {

            const names = _.keys(subscriptions);
            const handles = _.map(subscriptions, (args, name) => Meteor.subscribe(name, args));

            const namedHandles = _.zipObject(names, handles);

            _.forEach(namedHandles, (handle, name) => {

                const computation = Tracker.autorun(() => {

                    const isReady = handle.ready();
                    this.props.dispatch({
                        payload: { isReady, name },
                        type: subscriptionMessages.SET_SUBSCRIPTION_READY,
                    });

                });

                this.props.dispatch({
                    payload: { handle, name, computation },
                    type: subscriptionMessages.SUBSCRIBE,
                });
            });

        },
        componentWillUnmount() {
            _.forEach(_.keys(subscriptions), (name) => {
                this.props.dispatch({
                    payload: { name },
                    type: subscriptionMessages.UNSUBSCRIBE,
                });
            });
        },
    });

    const withState = withReducer('subscriptions', 'dispatch', reducer, {});

    return compose(withState, withLifecycle);

};
