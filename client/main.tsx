import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import { App } from 'Components/App';
import { store } from './Store';

Meteor.startup(() => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app'),
    );
});
