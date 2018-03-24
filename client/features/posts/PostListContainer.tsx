import { PostList, IPostListProps } from './PostList';
import { fetchPosts } from './actions';
import { IStoreState } from 'Client/Store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, renderComponent } from 'recompose';
import { LoadingSegment } from 'Features/shared/LoadingSegment'

const mapStateToProps = (state: IStoreState) => ({
    posts: state.posts,
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => ({
    getPosts: () => dispatch(fetchPosts()),
});

const isLoading = ({ posts }) => !posts || !posts.length;

const withSpinnerWhileLoading = branch(
    isLoading,
    renderComponent(LoadingSegment),
);

const withPostData = lifecycle<IPostListProps, {}>({
    componentDidMount() {
        this.props.getPosts();
    },
});

const enhanced = compose<IPostListProps, IPostListProps>(
    withPostData,
    withSpinnerWhileLoading,
)(PostList);

export const PostListContainer = connect(mapStateToProps, mapDispatchToProps)(enhanced);
