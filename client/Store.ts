import { ConnectedRouter, push, routerMiddleware, routerReducer, RouterState } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';
import { accounts } from 'Middleware/accounts';

import { commentsReducer, ICommentState } from 'Features/comments/reducer';
import { IPostsState, postsReducer } from 'Features/posts/reducer';
import { api } from 'Middleware/api';
import { mongoReducer } from './minimongo/reducers';

interface IRouterState extends RouterState {
    hash: string;
    pathname: string;
    search;
}

export interface IStoreState {
    comments: ICommentState;
    posts: IPostsState;
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

export const store = createStore(rootReducer, middleWare);
