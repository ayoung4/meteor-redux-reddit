import { Utils } from 'Client/Utils';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { IStoreState } from 'Client/Store';
import { INavbarProps, Navbar } from './Navbar';

const mapStateToProps = (state: IStoreState) => {
    const { isLoggedIn, username, avatar } = state.loggedInUser;
    return {
        activeItem: state.router.location.pathname,
        currentUser: { isLoggedIn, username, avatar },
    };
};

export const NavbarContainer = connect(mapStateToProps)(Navbar);
