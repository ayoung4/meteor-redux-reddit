import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import handleTransitions from 'redux-history-transitions';
import { createLogger } from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';

import { Comments } from 'Lib/Comments';
import { Posts } from 'Lib/Posts';

import { currentUserReducer } from 'Data/currentUser/reducer';
import { mongoReducer } from 'Data/mongoReducer';

import { LoginEpic } from './epics/LoginEpic';
import { SignUpEpic } from './epics/SignUpEpic';

import { Minimongo } from 'Services/Minimongo';

const rootReducer = combineReducers<IStoreState>({
    currentUser: currentUserReducer,
    form: formReducer,
    mongo: mongoReducer,
    router: routerReducer,
});

const rootEpic = combineEpics(LoginEpic);

const middleWare = applyMiddleware(thunk, createLogger(), createEpicMiddleware(rootEpic));

export const history = createHistory();

const transitions = handleTransitions(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxStore = createStore(rootReducer, undefined, composeEnhancers(
    middleWare,
    transitions,
));

Minimongo.connectCollection(Meteor.users, reduxStore);
Minimongo.connectCollection(Posts.collection, reduxStore);
Minimongo.connectCollection(Comments.collection, reduxStore);
Minimongo.connectLoggedInUser(reduxStore);

export const store = reduxStore;
