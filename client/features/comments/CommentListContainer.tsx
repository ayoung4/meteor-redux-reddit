import { IStoreState } from 'Client/Store';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Dispatch } from 'redux';
import { fetchComments } from './actions';
import { commentsByPostId } from './selectors';

import { CommentList, ICommentListProps } from './CommentList';

interface IProps {
    postId: string;
    comments: IComment[];
    getComments: (postId: string) => any;
}

const mapStateToProps = (state: IStoreState) => {
    const postId = state.router.location.pathname.split('/')[2];
    return {
        comments: commentsByPostId(state, postId),
        postId, 
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => ({
    getComments: (postId: string) => dispatch(fetchComments({ postId })),
});

const enhanced = lifecycle<IProps, IProps>({
    componentDidMount() {
        this.props.getComments(this.props.postId);
    },
})(({ comments }: IProps) => CommentList(comments));

export const CommentListContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(enhanced);
