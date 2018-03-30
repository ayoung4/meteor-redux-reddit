import { ConnectedRouter, push, routerMiddleware, routerReducer, RouterState } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';

import { Comments } from 'Lib/Comments';
import { Posts } from 'Lib/Posts';
import { accounts } from 'Middleware/accounts';
import { api } from 'Middleware/api';
import { connectCollection, connectLoggedInUser } from './minimongo/connectCollection';
import { ILoggedInUserState, loggedInUserReducer, mongoReducer } from './minimongo/reducers';

interface IRouterState extends RouterState {
    hash: string;
    pathname: string;
    search;
}

export interface IStoreState {
    loggedInUser: ILoggedInUserState;
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
    form: formReducer,
    loggedInUser: loggedInUserReducer,
    mongo: mongoReducer,
    router: routerReducer,
});

const middleWare = applyMiddleware(api, createLogger());

const reduxStore = createStore(rootReducer, middleWare);

connectCollection(Meteor.users, reduxStore);
connectCollection(Posts.collection, reduxStore);
connectCollection(Comments.collection, reduxStore);
connectLoggedInUser(reduxStore);

export const store = reduxStore;
