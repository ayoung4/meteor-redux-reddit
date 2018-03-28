import createHistory from 'history/createBrowserHistory';
import * as React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { Container, Header } from 'semantic-ui-react';

import { withSubscription } from 'Client/minimongo/withSubscription';
import { AddPost } from 'Scenes/AddPost';
import { Home } from 'Scenes/Home';
import { Login } from 'Scenes/Login';
import { PostDetail } from 'Scenes/PostDetail';
import { SignUp } from 'Scenes/SignUp';
const history = createHistory();

const loggedInUser = {
    ['users.logged-in']: {},
};

export const App = withSubscription({
    ['users.logged-in']: {},
})(() => (
    <ConnectedRouter history={history}>
        <Container style={{ marginTop: '80px' }}>
            <Header style={{ marginBottom: '40px' }}>Meteor Redux Reddit</Header>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/post/:id' component={PostDetail} />
            <Route path='/add/post' component={AddPost} />
        </Container>
    </ConnectedRouter>
));
