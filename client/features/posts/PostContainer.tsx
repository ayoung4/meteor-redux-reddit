import * as React from 'react';
import { Post, IPostProps } from './Post';
import { fetchPosts } from './actions';
import { IStoreState } from 'Client/Store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, renderComponent } from 'recompose';
import { withLoadingSegment } from 'Features/shared/LoadingSegment'
import { postById } from './selectors';
import { commentsByPostId } from 'Features/comments/selectors';

interface IProps {
    getPostById: (_id: string) => any;
}

const mapStateToProps = (state: IStoreState) => {
    const _id = state.router.location.pathname.split('/')[2];
    const { created, title, text } = postById(state, _id);
    return {
        _id,
        created,
        title,
        text,
        commentCount: commentsByPostId(state, _id).length,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => ({
    getPostById: (_id: string) => dispatch(fetchPosts({ _id })),
});

const withPostData = lifecycle<IPostProps & IProps, {}>({
    componentDidMount() {
        this.props.getPostById(this.props._id);
    },
});

const isLoading = ({ text }) => !text;

const enhanced = compose<IPostProps & IProps, IPostProps>(
    withPostData,
    withLoadingSegment(isLoading),
)(Post);

export const PostContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(enhanced);
