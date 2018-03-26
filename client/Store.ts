import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer} from 'redux-form';
import { logger } from 'Middleware/logger';
import { api } from 'Middleware/api';
import { postsReducer, IPostsState } from 'Features/posts/reducer';
import { commentsReducer, ICommentState } from 'Features/comments/reducer';
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
    comments: commentsReducer,
    form: formReducer,
    mongo: mongoReducer,
    posts: postsReducer,
    router: routerReducer,
});

const middleWare = applyMiddleware(logger, api);

export const store = createStore(rootReducer, middleWare);
