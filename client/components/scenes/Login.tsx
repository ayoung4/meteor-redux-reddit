import * as _ from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import * as React from 'react';
import { compose } from 'recompose';
import { Header } from 'semantic-ui-react';

import { IStoreState } from 'Client/Store';

import { LoginFormContainer } from 'Components/containers/LoginFormContainer';

export const Login = () => (
    <div id='page'>
        <Header>Log In</Header>
        <LoginFormContainer />
    </div>
);
