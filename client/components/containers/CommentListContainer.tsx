import * as React from 'react';
import { compose } from 'recompose';
import { Dispatch } from 'redux';

import { CommentList, ICommentListProps } from 'Components/elements/CommentList';
import { Providers } from 'Providers/Comments';
import { Providers as LoadingProviders } from 'Providers/Loading';

const isLoading = ({ ready }) => !ready;

const enhance = compose<ICommentListProps, { postId: string }>(
    Providers.withCommentsByPostId,
    Providers.withCommentsByPostIdSubscription,
    LoadingProviders.withLoadingSegment<ICommentListProps>(isLoading),
);

export const CommentListContainer = enhance(CommentList);
