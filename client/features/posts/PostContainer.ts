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

interface IProps extends IPostProps {
    getPostById: (_id: string) => any;
}

const mapStateToProps = (state: IStoreState) => {
    const _id = state.router.location.pathname.split('/')[2];
    const { created, title, text } = postById(state, _id);
    return {
        _id,
        commentCount: commentsByPostId(state, _id).length,
        created,
        text,
        title,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => ({
    getPostById: (_id: string) => dispatch(fetchPosts({ _id })),
});

const withPostData = lifecycle<IProps, {}>({
    componentDidMount() {
        this.props.getPostById(this.props._id);
    },
});

const isLoading = ({ text }) => !text;

const enhanced = compose<IProps, IPostProps>(
    withPostData,
    withLoadingSegment(isLoading),
)(Post);

export const PostContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(enhanced);
