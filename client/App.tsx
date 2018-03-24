import * as React from 'react';
import { PostListContainer } from 'Features/posts/PostListContainer';
import { PostContainer } from 'Features/posts/PostContainer';
import { Container, Header } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

const history = createHistory();

export const App = () => (
    <ConnectedRouter history={history}>
        <Container style={{ marginTop: '80px' }}>
            <Header>Meteor Redux Reddit</Header>
            <Route exact path='/' component={HomePage} />
            <Route path='/post/:id' component={PostDetailPage} />
        </Container>
    </ConnectedRouter>
);

const HomePage = () => (
    <div id="page">
        <PostListContainer />
    </div>
);

const PostDetailPage = () => (
    <div id="page">
        <PostContainer />
    </div>
);
