import * as React from 'react';
import { InputField } from 'react-semantic-redux-form';
import { Field, InjectedFormProps } from 'redux-form';
import { Button, Dimmer, Form, Loader, Message } from 'semantic-ui-react';

export interface ILoginFormProps extends InjectedFormProps<ICredentials> {
    isLoggedIn: any;
}

export const LoginForm: React.SFC<ILoginFormProps> = ({ pristine, handleSubmit, submitting, isLoggedIn, error }) => (
    <Form onSubmit={handleSubmit} error={!!error}>
        <Dimmer active={submitting} >
            <Loader content='Loading' />
        </Dimmer>
        <Message
            error
            header='Oops...'
            content={error}
        />
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
