import * as _ from 'lodash';
import * as React from 'react';
import { IPostProps, Post } from './Post';

export interface IPostListProps {
    postItems: IPostProps[];
}

export const PostList: React.SFC<IPostListProps> = ({ postItems }) => (
    <div>
        {_.map(postItems, (p) => Post(p))}
    </div>
);
