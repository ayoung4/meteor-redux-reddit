import { IStoreState } from 'Client/Store';
import { commentsByPostId } from 'Features/comments/selectors';
import { withLoadingSegment } from 'Features/shared/LoadingSegment';

import * as _ from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import * as React from 'react';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, renderComponent } from 'recompose';
import { Dispatch } from 'redux';

import { IPostListProps, PostList } from './PostList';

const mapStateToProps = (state: IStoreState, { postIds }: { postIds: string[] }) => {
    const posts = _.filter(state.mongo.collections.posts, ({ _id }) => _.includes(postIds, _id));
    return {
        postListData: _.map(posts, (p) => ({
            commentCount: commentsByPostId(state, p._id).length,
            ...p,
        })),
    };
};

const subscribeToPosts = ({ postIds }) => {
    const postsReady = Meteor.subscribe('posts.by-ids', { postIds }).ready();
    const commentsReady = _.map(postIds, (postId) =>
        Meteor.subscribe('comments.by-post-id', { postId }));
    return { ready: postsReady && commentsReady };
};

const isLoading = ({ ready }) => !ready;

const enhance = compose<IProps, { postIds: string[] }>(
    connect(mapStateToProps),
    withTracker(subscribeToPosts),
    withLoadingSegment<IProps>(isLoading),
);

interface IProps {
    postIds: string[];
    postListData: IPostListProps;
    ready: boolean;
}

const PostListContainerComp: React.SFC<IProps> = ({ postListData }) => PostList(postListData);

export const PostListContainer = enhance(PostListContainerComp);
