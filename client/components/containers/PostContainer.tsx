import * as React from 'react';
import { compose } from 'recompose';

import { IPostProps, Post } from 'Components/elements/Post';
import { Providers as LoadingProviders } from 'Providers/Loading';
import { Providers } from 'Providers/Posts';

interface IProps {
    postId: string;
    post: IPostProps;
    ready: boolean;
}

const isLoading = ({ ready }) => !ready;

const enhance = compose<IProps, { postId: string }>(
    Providers.withPostById,
    Providers.withPostByIdSubscription,
    LoadingProviders.withLoadingSegment<IProps>(isLoading),
);

export const PostContainer = enhance(({ post }) => Post(post));
