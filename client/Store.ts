import { ConnectedRouter, push, routerMiddleware, routerReducer, RouterState } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';

import { Comments } from 'Lib/Comments';
import { Posts } from 'Lib/Posts';

import { commentsReducer, ICommentState } from 'Features/comments/reducer';
import { IPostsState, postsReducer } from 'Features/posts/reducer';
import { api } from 'Middleware/api';
import { connectCollection } from './minimongo/connectCollection';
import { mongoReducer } from './minimongo/reducers';

interface IRouterState extends RouterState {
    hash: string;
    pathname: string;
    search;
}

export interface IStoreState {
    comments: ICommentState;
    posts: IPostsState;
    mongo: {
        collections: {
            comments: IComment[];
            posts: IPost[];
        };
    };
    router: {
        location: IRouterState;
    };
}

const rootReducer = combineReducers<IStoreState>({
    comments: commentsReducer,
    form: formReducer,
    mongo: mongoReducer,
    posts: postsReducer,
    router: routerReducer,
});

const middleWare = applyMiddleware(api, createLogger());

const reduxStore = createStore(rootReducer, middleWare);

connectCollection(Meteor.users, reduxStore);
connectCollection(Posts.collection, reduxStore);
connectCollection(Comments.collection, reduxStore);

export const store = reduxStore;
