import * as React from 'react';
import { compose } from 'recompose';
import { Dispatch } from 'redux';

import { CommentList, ICommentListProps } from 'Components/elements/CommentList';
import { Providers } from 'Providers/Comments';
import { Providers as LoadingProviders } from 'Providers/Loading';

const isLoading = ({ ready }) => !ready;

interface IProps {
    ready: boolean;
    postId: string;
    comments: IComment[];
}

const enhance = compose<IProps, { postId: string }>(
    Providers.withCommentsByPostId,
    Providers.withCommentsByPostIdSubscription,
    LoadingProviders.withLoadingSegment<IProps>(isLoading),
);

export const CommentListContainer = enhance(({ comments }) => CommentList({ comments }));
