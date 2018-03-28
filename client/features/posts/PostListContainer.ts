import { withSubscription } from 'Client/minimongo/withSubscription';
import { IStoreState } from 'Client/Store';
import { commentsByPostId } from 'Features/comments/selectors';
import { withLoadingSegment } from 'Features/shared/LoadingSegment';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, renderComponent } from 'recompose';
import { Dispatch } from 'redux';
import { fetchPosts } from './actions';

import { IPostListProps, PostList } from './PostList';

type IProps = IPostListProps & {
    getPosts: any;
};

const mapStateToProps = (state: IStoreState) => ({
    postItems: _.map(state.mongo.collections.posts, ({ _id, created, title, text }) => ({
        _id,
        commentCount: commentsByPostId(state, _id).length,
        created,
        text,
        title,
    })),
});

const isLoading = ({ subscriptions }) => !(subscriptions['posts.all']
    && subscriptions['posts.all'].isReady);

const enhance = compose<IPostListProps, IPostListProps>(
    withSubscription({
        ['posts.all']: {},
    }),
    withLoadingSegment(isLoading),
    connect(mapStateToProps),
);

export const PostListContainer = enhance(PostList);
