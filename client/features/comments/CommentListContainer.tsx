import { CommentList, ICommentListProps } from './CommentList';
import { fetchComments } from './actions';
import { IStoreState } from 'Client/Store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, renderComponent } from 'recompose';
import { commentsByPostId } from './selectors';

interface IProps {
    postId: string;
    comments: IComment[];
    getComments: (postId: string) => any;
}

const mapStateToProps = (state: IStoreState) => {
    const postId = state.router.location.pathname.split('/')[2];
    return {
        postId, 
        comments: commentsByPostId(state, postId),
    }
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
