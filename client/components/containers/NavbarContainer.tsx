import * as React from 'react';
import { compose, lifecycle  } from 'recompose';

import { Providers as CurrentUserProviders } from 'Providers/CurrentUser';
import { Providers as RouterProviders } from 'Providers/Router';

import { INavbarProps, Navbar } from 'Components/elements/Navbar';

const enhance = compose(
    CurrentUserProviders.withCurrentUser,
    lifecycle({
        componentDidMount() {
            this.props.subscribeToLoggedInUser();
        },
        componentWillUnmount() {
            this.props.stopSubscription();
        },
    }),
    RouterProviders.withLocation,
);

export const NavbarContainer = enhance(Navbar);
