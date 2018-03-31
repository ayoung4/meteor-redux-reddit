import * as React from 'react';
import { Header } from 'semantic-ui-react';

import { AddPostFormContainer } from 'Components/containers/AddPostFormContainer';

export const AddPost = () => (
    <div id='page'>
        <Header>Create a New Post</Header>
        <AddPostFormContainer />
    </div>
);
