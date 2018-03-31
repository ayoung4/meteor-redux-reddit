import * as _ from 'lodash';
import { connect } from 'react-redux';

import { withTracker } from 'meteor/react-meteor-data';

import { Selectors } from 'Data/collections/selectors';

export module Providers {

    const mapStateToAllPostsIds = (state: IStoreState) => {
        const posts = state.mongo.collections.posts;
        return {
            postIds: _.map(posts, ({ _id }) => _id),
        };
    };

    const mapStateToPostById = (state: IStoreState, { postId, ...props }) => {
        const post = Selectors.postById(state, postId);
        return {
            postId,
            ...props,
            post: {
                commentCount: Selectors.commentsByPostId(state, postId).length,
                ...post,
            },
        };
    };

    const mapStateToPostsByIds = (state: IStoreState, { postIds, ...props }) => {
        const posts = Selectors.postsByIds(state, postIds);
        return {
            postIds,
            ...props,
            posts: _.map(posts, (p) => ({
                commentCount: Selectors.commentsByPostId(state, p._id).length,
                ...p,
            })),
        };
    };

    const subscribeToAllPosts = () => {
        const ready = Meteor.subscribe('posts.all').ready();
        return { ready };
    };

    const subscribeToPostById = ({ postId, ...props }) => {
        const postsReady = Meteor.subscribe('posts.by-id', { _id: postId }).ready();
        const commentsReady = Meteor.subscribe('comments.by-post-id', { postId }).ready();
        return {
            postId,
            ...props,
            ready: postsReady && commentsReady,
        };
    };

    const subscribeToPostsByIds = ({ postIds, ...props }) => {
        const postsReady = Meteor.subscribe('posts.by-ids', { postIds }).ready();
        const commentsReady = _.map(postIds, (postId) =>
            Meteor.subscribe('comments.by-post-id', { postId }));
        return {
            postIds,
            ...props,
            ready: postsReady && commentsReady,
        };
    };

    export const withAllPostIds = connect(mapStateToAllPostsIds);
    
    export const withPostById = connect(mapStateToPostById);
    
    export const withPostsByIds = connect(mapStateToPostsByIds);
    
    export const withAllPostsSubscriptions = withTracker(subscribeToAllPosts);

    export const withPostByIdSubscription = withTracker(subscribeToPostById);

    export const withPostsByIdsSubscription = withTracker(subscribeToPostsByIds);

}
