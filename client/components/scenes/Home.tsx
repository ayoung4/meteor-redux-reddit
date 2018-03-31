import * as _ from 'lodash';
import * as React from 'react';
import { compose } from 'recompose';
import { Header, Image, Segment } from 'semantic-ui-react';

import { PostListContainer } from 'Components/containers/PostListContainer';
import { NoPostsSegment } from 'Components/elements/NoPostsSegment';

import { Providers as LoadingProviders } from 'Providers/Loading';
import { Providers } from 'Providers/Posts';

const isLoading = ({ ready }) => !ready;

interface IHomeProps {
    ready: boolean;
    postIds: string[];
}

const enhance = compose<IHomeProps, {}>(
    Providers.withAllPostIds,
    Providers.withAllPostsSubscriptions,
    LoadingProviders.withLoadingSegment(isLoading),
);

export const Home = enhance(({ postIds }) => (
    <div id='page'>
        {!postIds.length
            ? (<NoPostsSegment />)
            : (<PostListContainer postIds={postIds} />)}
    </div>
));
