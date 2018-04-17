import * as React from 'react';

import { CommentListContainer } from 'Components/containers/CommentListContainer';
import { PostContainer } from 'Components/containers/PostContainer';

import { Providers } from 'Providers/Router';

export const PostDetail = Providers.withPostId(() => (
    <div id='page'>
        <PostContainer postId={match.params.postId} />
        <CommentListContainer postId={match.params.postId} />
    </div>
));
