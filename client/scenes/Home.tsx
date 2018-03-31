import * as _ from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { Header, Image, Segment } from 'semantic-ui-react';

import { IStoreState } from 'Client/Store';
import { PostListContainer } from 'Features/posts/PostListContainer';
import { withLoadingSegment } from 'Features/shared/LoadingSegment';

const mapStateToProps = (state: IStoreState) => {
    const posts = state.mongo.collections.posts;
    return {
        postIds: _.map(posts, ({ _id }) => _id),
    };
};

const subscribeToPosts = () => {
    const ready = Meteor.subscribe('posts.all').ready();
    return { ready };
};

const isLoading = ({ ready }) => !ready;

interface IHomeProps {
    ready: boolean;
    postIds: string[];
}

const enhance = compose<IHomeProps, {}>(
    withTracker(subscribeToPosts),
    connect(mapStateToProps),
    withLoadingSegment<IHomeProps>(isLoading),
);

const NoPostsSegment: React.SFC<{}> = () => (
    <Segment textAlign='center'>
        <Header>There Are No Posts To Display!</Header>
        <Link to='/add/post'>Make One</Link>
    </Segment>
);

export const Home = enhance(({ postIds }) => (
    <div id='page'>
        {!postIds.length
            ? (<NoPostsSegment />)
            : (<PostListContainer postIds={postIds} />)}
    </div>
));
