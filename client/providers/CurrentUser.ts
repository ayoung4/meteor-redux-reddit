import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

import { subscribe, stopSubscription } from 'Data/subscriptions/actions';
import { LoggedInUser } from 'Lib/publications';
import { createSubscriptionActionsCreator } from 'meteor-redux-subscriptions';

export module Providers {

    const mapStateToIsLoggedIn = (state: IStoreState, props) => ({
        isLoggedIn: state.currentUser.isLoggedIn,
        ...props,
    });

    const mapStateToCurrentUser = (state: IStoreState, props) => ({
        currentUser: state.currentUser,
        ...props,
    });

    const mapDispatchToCurrentUserSubscription = (dispatch) => ({
        stopSubscription: () => dispatch(stopSubscription({
            publication: LoggedInUser,
        })),
        subscribeToLoggedInUser: () => dispatch(subscribe({
            publication: LoggedInUser,
            subscriptionArgs: {},
        })),
    });

    const subscribeToCurrentUser = (props) => {
        const ready = LoggedInUser.subscribe({}).ready();
        return {
            ready,
            ...props,
        };
    };

    export const withIsLoggedIn = connect(mapStateToIsLoggedIn);

    export const withCurrentUser = connect(mapStateToCurrentUser, mapDispatchToCurrentUserSubscription);

    export const withCurrentUserSubscription = withTracker(subscribeToCurrentUser);

}
