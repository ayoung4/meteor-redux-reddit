import { Selectors } from 'Data/collections/selectors';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

export module Providers {

    const mapStateToCommentByPostId = (state: IStoreState, { postId, ...props }: { postId: string }) => {
        const comments = Selectors.commentsByPostId(state, postId);
        return {
            comments,
            postId,
            ...props,
        };
    };

    const subscribeToCommentsByPostId = ({ postId, ...props }) => {
        const ready = Meteor.subscribe('comments.by-post-id', { postId }).ready();
        return {
            ready,
            ...props,
        };
    };

    export const withCommentsByPostId = connect(mapStateToCommentByPostId);

    export const withCommentsByPostIdSubscription = withTracker(subscribeToCommentsByPostId);

}
