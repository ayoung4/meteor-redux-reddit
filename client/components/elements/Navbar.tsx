import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';
import { Avatar } from './Avatar';

export interface INavbarProps {
    location: string;
    currentUser: {
        isLoggedIn: boolean
        username: string;
        avatar: IColor;
    };
}

interface IHeaderMenuProps {
    username: string;
    avatar: IColor;
}

const SignUpMenu: React.SFC<{ location: string }> = ({ location }) => (
    <Menu.Menu position='right'>
        <Menu.Item name='login' as={Link} to={'/login'} active={location === '/login'}>Log in</Menu.Item>
        <Menu.Item name='signup' as={Link} to={'/sign-up'} active={location === '/sign-up'}>Sign up</Menu.Item>
    </Menu.Menu>
);

const LogOutMenu: React.SFC<{}> = () => (
    <Menu.Menu position='right'>
        <Menu.Item as={Button} name='logout' onClick={() => Meteor.logout()}>Log out</Menu.Item>
    </Menu.Menu>
);

export const Navbar: React.SFC<INavbarProps> = ({ location, currentUser }) => (
    <div id='header'>
        <Menu size='massive' secondary style={{ marginBottom: '25px' }}>
            <Menu.Header name='home' style={{ margin: '0.5em' }}>
                <h1>Credddit</h1>
            </Menu.Header>
            <Menu.Menu position='right'>
                <Menu.Item fitted>
                    {currentUser.username}
                    <Avatar {...currentUser.avatar} />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
        <Menu size='large' secondary pointing style={{ marginBottom: '40px' }}>
            <Menu.Item name='home' as={Link} to={'/'} active={location === '/'} />
            <Menu.Item name='post' as={Link} to={'/add/post'} active={location === '/add/post'} />
            {currentUser.isLoggedIn
                ? (<LogOutMenu />)
                : (<SignUpMenu location={location}/>)}
        </Menu>
    </div>
);
