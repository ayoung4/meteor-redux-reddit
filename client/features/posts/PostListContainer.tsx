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
    postItems: _.map(state.posts, ({ _id, created, title, text }) => ({
        _id,
        commentCount: commentsByPostId(state, _id).length,
        created,
        text,
        title,
    })),
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => ({
    getPosts: () => dispatch(fetchPosts()),
});

const isLoading = ({ postItems }) => !postItems || !postItems.length;

const withPostData = lifecycle<IProps, {}>({
    componentDidMount() {
        this.props.getPosts();
    },
});

const enhanced = compose<IPostListProps, IProps>(
    withPostData,
    withLoadingSegment(isLoading),
)(PostList);

export const PostListContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(enhanced);
