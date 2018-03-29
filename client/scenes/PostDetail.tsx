import { withTracker } from 'meteor/react-meteor-data';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { IStoreState } from 'Client/Store';
import { CommentListContainer } from 'Features/comments/CommentListContainer';
import { commentsByPostId } from 'Features/comments/selectors';
import { IPostProps, Post } from 'Features/posts/Post';
import { PostContainer } from 'Features/posts/PostContainer';
import { postById } from 'Features/posts/selectors';
import { withLoadingSegment } from 'Features/shared/LoadingSegment';

const mapStateToProps = (state: IStoreState) => {
    const postId = state.router.location.pathname.split('/')[2];
    return {
        postId,
    };
};

interface IPostDetailProps {
    postId: string;
}

export const PostDetail = connect(mapStateToProps)(({ postId }) => (
    <div id='page'>
        <PostContainer postId={postId} />
        <CommentListContainer postId={postId} />
    </div>
));
