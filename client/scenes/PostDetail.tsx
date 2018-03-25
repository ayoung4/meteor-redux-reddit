import * as React from 'react';
import { PostContainer } from 'Features/posts/PostContainer';
import { CommentListContainer } from 'Features/comments/CommentListContainer';

export const PostDetail = () => (
    <div id="page">
        <PostContainer />
        <CommentListContainer />
    </div>
);
