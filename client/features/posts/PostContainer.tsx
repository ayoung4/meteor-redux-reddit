import * as React from 'react';
import { Post } from './Post';
import { fetchPosts } from './actions';
import { IStoreState } from 'Client/Store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, renderComponent } from 'recompose';
import { LoadingSegment } from 'Features/shared/LoadingSegment'
import * as _ from 'lodash';

const mapStateToProps = (state: IStoreState) => {
    const _id = state.router.location.pathname.split('/')[2];
    return {
        _id,
        post: _.find(state.posts, (p) => p._id === _id),
    }
};

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => ({
    getPostById: (_id: string) => dispatch(fetchPosts({ _id })),
});

interface IProps {
    _id: string;
    post: IPost;
    getPostById: (_id: string) => any;
}

const isLoading = ({ post }) => !post;

const withSpinnerWhileLoading = branch(
    isLoading,
    renderComponent(LoadingSegment),
);

const withPostData = lifecycle<IProps, IProps>({
    componentDidMount() {
        this.props.getPostById(this.props._id);
    },
});

const enhanced = compose<IProps, IProps>(
    withPostData,
    withSpinnerWhileLoading,
)(({ post }: IProps) => Post(post));

export const PostContainer = connect(mapStateToProps, mapDispatchToProps)(enhanced);
