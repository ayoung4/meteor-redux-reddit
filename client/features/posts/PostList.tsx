import * as React from 'react';
import { Post, IPostProps } from './Post';
import * as _ from 'lodash';

export interface IPostListProps {
    postItems: IPostProps[];
}

export const PostList: React.SFC<IPostListProps> = ({ postItems }) => (
    <div>
        {_.map(postItems, (p) => Post(p))}
    </div>
);
