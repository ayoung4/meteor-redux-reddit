import createHistory from 'history/createBrowserHistory';
import { withTracker } from 'meteor/react-meteor-data';
import * as React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { Container, Header } from 'semantic-ui-react';

import { NavbarContainer } from 'Features/users/NavbarContainer';
import { AddPost } from 'Scenes/AddPost';
import { Home } from 'Scenes/Home';
import { Login } from 'Scenes/Login';
import { PostDetail } from 'Scenes/PostDetail';
import { SignUp } from 'Scenes/SignUp';

const history = createHistory();

const enhance = withTracker(() => {
    const ready = Meteor.subscribe('users.logged-in').ready();
    return { ready };
});

export const App = enhance(() => (
    <ConnectedRouter history={history}>
        <Container style={{ marginTop: '80px', marginBottom: '80px' }}>
            <NavbarContainer />
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/post/:id' component={PostDetail} />
            <Route path='/add/post' component={AddPost} />
        </Container>
    </ConnectedRouter>
));
