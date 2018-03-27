import * as React from 'react';
import { Header } from 'semantic-ui-react';

import { SignUpFormContainer } from 'Features/users/SignUpFormContainer';

export const SignUp = () => (
    <div id='page'>
        <Header>Create an Account</Header>
        <SignUpFormContainer />
    </div>
);
