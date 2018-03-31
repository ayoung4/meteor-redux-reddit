import { connect } from 'react-redux';

export module Providers {

    const mapStateToLocation = (state: IStoreState, props) => ({
        ...props,
        location: state.router.location.pathname,
    });

    const mapStateToPostId = (state: IStoreState, props) => {
        const postId = state.router.location.pathname.split('/')[2];
        return {
            ...props,
            postId,
        };
    };

    export const withLocation = connect(mapStateToLocation);
    
    export const withPostId = connect(mapStateToPostId);

}
