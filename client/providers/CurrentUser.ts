import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

export module Providers {

    const mapStateToIsLoggedIn = (state: IStoreState, props) => ({
        isLoggedIn: state.currentUser.isLoggedIn,
        ...props,
    });

    const mapStateToCurrentUser = (state: IStoreState, props) => ({
        currentUser: state.currentUser,
        ...props,
    });

    const subscribeToCurrentUser = (props) => {
        const ready = Meteor.subscribe('users.logged-in').ready();
        return { ready, ...props };
    };

    export const withIsLoggedIn = connect(mapStateToIsLoggedIn);

    export const withCurrentUser = connect(mapStateToCurrentUser);

    export const withCurrentUserSubscription = withTracker(subscribeToCurrentUser);

}
