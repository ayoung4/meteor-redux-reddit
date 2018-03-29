import { IStoreState } from 'Client/Store';
import { commentsByPostId } from 'Features/comments/selectors';
import { withLoadingSegment } from 'Features/shared/LoadingSegment';

import { withTracker } from 'meteor/react-meteor-data';
import * as React from 'react';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, renderComponent } from 'recompose';
import { Dispatch } from 'redux';

import { CommentList } from './CommentList';

const mapStateToProps = (state: IStoreState, { postId }: { postId: string }) => {
    const comments = commentsByPostId(state, postId);
    return {
        commentData: comments,
        postId,
    };
};

const subscribeToComments = ({ postId }) => {
    const ready = Meteor.subscribe('comments.by-post-id', { postId }).ready();
    return { ready };
};

const isLoading = ({ ready }) => !ready;

const enhance = compose<IProps, { postId: string }>(
    connect(mapStateToProps),
    withTracker(subscribeToComments),
    withLoadingSegment<IProps>(isLoading),
);

interface IProps {
    postId: string;
    commentData: IComment[];
    ready: boolean;
}

const CommentListContainerComp: React.SFC<IProps> = ({ commentData }) => CommentList(commentData);

export const CommentListContainer = enhance(CommentListContainerComp);
