import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import handleTransitions from 'redux-history-transitions';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';

import { Comments } from 'Lib/Comments';
import { Posts } from 'Lib/Posts';

import { mongoReducer } from 'Data/collections/reducer';
import { currentUserReducer } from 'Data/currentUser/reducer'; 

import { Minimongo } from 'Services/Minimongo'; 

const rootReducer = combineReducers<IStoreState>({
    currentUser: currentUserReducer,
    form: formReducer,
    mongo: mongoReducer,
    router: routerReducer,
});
const middleWare = applyMiddleware(thunk, createLogger());

export const history = createHistory();
const enhancer = handleTransitions(history);
const reduxStore = createStore(rootReducer, middleWare, enhancer);

Minimongo.connectCollection(Meteor.users, reduxStore);
Minimongo.connectCollection(Posts.collection, reduxStore);
Minimongo.connectCollection(Comments.collection, reduxStore);
Minimongo.connectLoggedInUser(reduxStore);

export const store = reduxStore;
