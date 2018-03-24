import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './Store';
import 'semantic-ui-css/semantic.min.css';

Meteor.startup(() => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app'),
    );
});
