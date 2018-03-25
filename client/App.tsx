import * as React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { Home } from 'Scenes/Home';
import { PostDetail } from 'Scenes/PostDetail';
import { AddPost } from 'Scenes/AddPost';

const history = createHistory();

export const App = () => (
    <ConnectedRouter history={history}>
        <Container style={{ marginTop: '80px' }}>
            <Header style={{ marginBottom: '40px' }}>Meteor Redux Reddit</Header>
            <Route exact path='/' component={Home} />
            <Route path='/post/:id' component={PostDetail} />
            <Route exact path='/add/post' component={AddPost} />
        </Container>
    </ConnectedRouter>
);

