import * as React from 'react';
import { Header } from 'semantic-ui-react';

import { LoginFormContainer } from 'Features/users/LoginFormContainer';

export const Login = () => (
    <div id='page'>
        <Header>Log In</Header>
        <LoginFormContainer />
    </div>
);
