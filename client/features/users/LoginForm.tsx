import * as React from 'react';
import { InputField } from 'react-semantic-redux-form';
import { Field, InjectedFormProps } from 'redux-form';
import { Button, Dimmer, Form, Loader } from 'semantic-ui-react';

export interface ILoginFormData {
    username: string;
    password: string;
}

export interface ILoginFormProps extends InjectedFormProps<ILoginFormData> {
    isLoggedIn: any;
    onSubmit: (args) => void;
}

export const LoginForm: React.SFC<ILoginFormProps> = ({ pristine, handleSubmit, submitting, isLoggedIn }) => (
    <Form onSubmit={handleSubmit}>
        <Dimmer active={submitting} >
            <Loader content='Loading' />
        </Dimmer>
        <Field component={InputField}
            name='username'
            label='Username'
            autoComplete='off'
            disabled={isLoggedIn}
        />
        <Field
            component={InputField}
            name='password'
            label='Password'
            type='password'
            autoComplete='off'
            disabled={isLoggedIn}
        />
        <Button type='submit' disabled={pristine || submitting || isLoggedIn}>Log In</Button>
    </Form>
);
