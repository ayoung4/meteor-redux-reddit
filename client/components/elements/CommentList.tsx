import * as _ from 'lodash';
import * as React from 'react';
import { Divider, Feed } from 'semantic-ui-react';

export interface IEvent {
    date?: string;
    image?: string;
    meta?: string;
    summary: string;
}

export interface ICommentListProps {
    postId: string;
    ready: boolean;
    comments: IComment[];
}

export const CommentList: React.SFC<ICommentListProps> = ({ comments }) => (
    <div>
        <Divider horizontal>
            {!!comments && comments.length ? 'comments' : 'no comments to display'}
        </Divider>
        <Feed events={_.map(comments, ({ _id, created, text }) => ({
            date: created.toDateString(),
            image: 'https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg',
            key: _id,
            summary: text,
        }))}></Feed>
    </div>
);
