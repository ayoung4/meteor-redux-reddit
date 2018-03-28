import { withSubscription } from 'Client/minimongo/withSubscription';
import { IStoreState } from 'Client/Store';
import { commentsByPostId } from 'Features/comments/selectors';
import { withLoadingSegment } from 'Features/shared/LoadingSegment';
import * as React from 'react';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, renderComponent } from 'recompose';
import { Dispatch } from 'redux';
import { fetchPosts } from './actions';
import { postById } from './selectors';

import { IPostProps, Post } from './Post';

const mapStateToProps = (state: IStoreState) => {
    const _id = state.router.location.pathname.split('/')[2];
    const { created, title, text } = postById(state, _id);
    console.log(state);

    return {
        _id,
        commentCount: commentsByPostId(state, _id).length,
        created,
        text,
        title,
    };
};

const isLoading = ({ subscriptions }) => !(subscriptions 
    && subscriptions['posts.by-id']
    && subscriptions['posts.by-id'].isReady);

const enhance = compose<IPostProps, IPostProps & ISubscriptionProps>(
    connect(mapStateToProps),
    withSubscription({
        ['posts.by-id']: { _id: '9uqePWmEKGCGXrLeS' },
    }),
    withLoadingSegment<IPostProps & ISubscriptionProps>(isLoading),
);

export const PostContainer = enhance(Post);
