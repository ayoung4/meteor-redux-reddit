import * as React from 'react';
import { InputField, TextArea } from 'react-semantic-redux-form';
import { Field, InjectedFormProps } from 'redux-form';
import { Button, Dimmer, Form, Loader } from 'semantic-ui-react';

export interface IAddPostFormData {
    text: string;
    title: string;
}

export interface IAddPostFormProps extends InjectedFormProps<IAddPostFormData> { }

export const AddPostForm: React.SFC<InjectedFormProps<IAddPostFormData>> = ({ pristine, handleSubmit, submitting }) => (
    <Form onSubmit={handleSubmit}>
        <Dimmer active={submitting} >
            <Loader content='Loading' />
        </Dimmer>
        <Field component={InputField}
            name='title'
            label='Title'
            autoComplete='off'
            placeholder='give your post a title'
        />
        <Field component={TextArea}
            name='text'
            autoComplete='off'
            placeholder='write your post here...'
        />
        <br />
        <br />
        <Button type='submit' disabled={pristine || submitting}>Post</Button>
    </Form>
);
