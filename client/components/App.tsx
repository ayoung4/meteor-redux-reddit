import * as React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { Container, Header } from 'semantic-ui-react';

import { NavbarContainer } from 'Containers/NavbarContainer';

import { AddPost } from 'Scenes/AddPost';
import { Home } from 'Scenes/Home';
import { Login } from 'Scenes/Login';
import { PostDetail } from 'Scenes/PostDetail';
import { SignUp } from 'Scenes/SignUp';

import { Providers } from 'Providers/CurrentUser';

import { history } from 'Client/Store';

export const App = Providers.withCurrentUserSubscription(() => (
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
