import * as React from 'react';
import { InputField } from 'react-semantic-redux-form';
import { Field, InjectedFormProps } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';

export interface ILoginFormProps extends InjectedFormProps{
    onSubmit: any;
}

export interface ILoginFormData {
    username: string;
    password: string;
}

export const LoginForm: React.SFC<ILoginFormProps> = ({ anyTouched, pristine, handleSubmit }) => (
    <Form onSubmit={handleSubmit}>
        <Field component={InputField}
            name='username'
            label='Username'
            autoComplete='off'
        />
        <Field
            component={InputField}
            name='password'
            label='Password'
            type='password'
            autoComplete='off'
        />
        <Button type='submit' disabled={pristine}>Log In</Button>
    </Form>
);
