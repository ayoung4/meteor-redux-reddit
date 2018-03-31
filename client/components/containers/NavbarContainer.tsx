import * as React from 'react';
import { compose } from 'recompose';

import { Providers as CurrentUserProviders } from 'Providers/CurrentUser';
import { Providers as RouterProviders } from 'Providers/Router';

import { INavbarProps, Navbar } from 'Components/elements/Navbar';

const enhance = compose<INavbarProps, {}>(
    CurrentUserProviders.withCurrentUser,
    RouterProviders.withLocation,
);

export const NavbarContainer = enhance(Navbar);
