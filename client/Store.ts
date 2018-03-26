import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from 'Middleware/logger';
import { api } from 'Middleware/api';
import { commentsReducer, ICommentState } from 'Features/comments/reducer';
import { postsReducer, IPostsState } from 'Features/posts/reducer';
import { mongoReducer } from './minimongo/reducers';
import { ConnectedRouter, routerReducer, routerMiddleware, push, RouterState } from 'react-router-redux'

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
    posts: postsReducer,
    comments: commentsReducer,
    mongo: mongoReducer,
    router: routerReducer,
});

const middleWare = applyMiddleware(logger, api);

export const store = createStore(rootReducer, middleWare);

console.log(store.getState());

