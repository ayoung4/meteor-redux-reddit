import * as React from 'react';
import { compose } from 'recompose';

import { IPostListProps, PostList } from 'Components/elements/PostList';
import { Providers as LoadingProviders } from 'Providers/Loading';
import { Providers } from 'Providers/Posts';

interface IProps {
    postIds: string[];
    posts: IPostListProps;
    ready: boolean;
}

const isLoading = ({ ready }) => !ready;

const enhance = compose<IProps, { postIds: string[] }>(
    Providers.withPostsByIds,
    Providers.withPostsByIdsSubscription,
    LoadingProviders.withLoadingSegment<IProps>(isLoading),
);

export const PostListContainer = enhance(({ posts }) => PostList({ posts }));
