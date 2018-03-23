import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';

Meteor.startup(() => {
    render(
        <App />,
        document.getElementById('app')
    );
});