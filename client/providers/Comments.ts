import { Selectors } from 'Data/collections/selectors';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

export module Providers {

    const mapStateToCommentByPostId = (state: IStoreState, { postId }: { postId: string }) => {
        const comments = Selectors.commentsByPostId(state, postId);
        return {
            comments,
            postId,
        };
    };
    
    const subscribeToCommentsByPostId = ({ postId }) => {
        const ready = Meteor.subscribe('comments.by-post-id', { postId }).ready();
        return { ready };
    };

    export const withCommentsByPostId = connect(mapStateToCommentByPostId);

    export const withCommentsByPostIdSubscription = withTracker(subscribeToCommentsByPostId);

}
