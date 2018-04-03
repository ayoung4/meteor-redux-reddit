import * as faker from 'faker';
import * as _ from 'lodash';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';

import { INavbarProps, Navbar } from '../../client/components/elements/Navbar';

const loggedOutNavbarArgs: INavbarProps = {
    currentUser: {
        avatar: {
            b: 130,
            g: 100,
            r: 200,
        },
        isLoggedIn: false,
        username: 'anonymous',
    },
    location: '/',
};

const loggedInNavbarArgs: INavbarProps = {
    currentUser: {
        avatar: {
            b: 130,
            g: 100,
            r: 200,
        },
        isLoggedIn: true,
        username: faker.name.findName(),
    },
    location: '/',
};

storiesOf('Navbar', module)
    .addDecorator((story) => <MemoryRouter>{story()}</MemoryRouter>)
    .add('logged out', () => <Navbar {...loggedOutNavbarArgs} />)
    .add('logged in', () => <Navbar {...loggedInNavbarArgs} />);
