import * as React from 'react';

import { CommentListContainer } from 'Features/comments/CommentListContainer';
import { PostContainer } from 'Features/posts/PostContainer';

export const PostDetail = () => (
    <div id="page">
        <PostContainer />
        <CommentListContainer />
    </div>
);
