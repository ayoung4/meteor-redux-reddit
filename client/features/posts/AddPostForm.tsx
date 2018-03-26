import * as React from 'react';
import { Button, Form } from 'semantic-ui-react';

export const AddPostForm: React.SFC<{}> = () => (
    <Form>
        <Form.Input fluid label='Title' placeholder='give your post a title' />
        <Form.TextArea fluid placeholder='write your post here...' />
        <Button type='submit'>Post</Button>
    </Form>
);
