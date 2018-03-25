import { PostList, IPostListProps } from './PostList';
import { fetchPosts } from './actions';
import { IStoreState } from 'Client/Store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, renderComponent } from 'recompose';
import { withLoadingSegment } from 'Features/shared/LoadingSegment'
import { commentsByPostId } from 'Features/comments/selectors';
import * as _ from 'lodash';

type IProps = IPostListProps & {
    getPosts: any;
}

const mapStateToProps = (state: IStoreState) => ({
    postItems: _.map(state.posts, ({ _id, created, title, text }) => ({
        _id,
        created,
        title,
        text,
        commentCount: commentsByPostId(state, _id).length,
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
