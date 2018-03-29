import { IStoreState } from 'Client/Store';
import { commentsByPostId } from 'Features/comments/selectors';
import { withLoadingSegment } from 'Features/shared/LoadingSegment';

import { withTracker } from 'meteor/react-meteor-data';
import * as React from 'react';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, renderComponent } from 'recompose';
import { Dispatch } from 'redux';
import { postById } from './selectors';

import { IPostProps, Post } from './Post';

const mapStateToProps = (state: IStoreState, { postId }: { postId: string }) => {
    const post = postById(state, postId);
    return {
        postData: {
            commentCount: commentsByPostId(state, postId).length,
            ...post,
            _id: postId,
        },
    };
};

const subscribeToPost = ({ postData }) => {
    const postsReady = Meteor.subscribe('posts.by-id', { _id: postData._id }).ready();
    const commentsReady = Meteor.subscribe('comments.by-post-id', { postId: postData._id }).ready();
    return { ready: postsReady && commentsReady };
};

const isLoading = ({ ready }) => !ready;

const enhance = compose<IProps, { postId: string }>(
    connect(mapStateToProps),
    withTracker(subscribeToPost),
    withLoadingSegment<IProps>(isLoading),
);

interface IProps {
    postId: string;
    postData: IPostProps;
    ready: boolean;
}

const PostContainerComp: React.SFC<IProps> = ({ postData }) => Post(postData);

export const PostContainer = enhance(PostContainerComp);
