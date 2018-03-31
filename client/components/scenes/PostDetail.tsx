import * as React from 'react';

import { CommentListContainer } from 'Components/containers/CommentListContainer';
import { PostContainer } from 'Components/containers/PostContainer';

import { Providers } from 'Providers/Router';

export const PostDetail = Providers.withPostId(({ postId }) => (
    <div id='page'>
        <PostContainer postId={postId} />
        <CommentListContainer postId={postId} />
    </div>
));
