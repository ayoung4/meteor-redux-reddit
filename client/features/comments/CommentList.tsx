import * as _ from 'lodash';
import * as React from 'react';
import { Divider, Feed } from 'semantic-ui-react';

export interface ICommentListProps {
    comments: IComment[];
}

export interface IEvent {
    date?: string;
    image?: string;
    meta?: string;
    summary: string;
}

export const CommentList: React.SFC<IComment[]> = (comments) => (
    <div>
        <Divider horizontal>
            {!!comments && comments.length ? 'comments' : 'no comments to display'}
        </Divider>
        <Feed events={_.map(comments, ({created, text}) => ({
            date: created.toDateString(),
            image: 'https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg',
            summary: text,
        }))}></Feed>
    </div>
);
