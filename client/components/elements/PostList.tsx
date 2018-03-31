import * as _ from 'lodash';
import * as React from 'react';
import { IPostProps, Post } from './Post';

export interface IPostListProps {
    posts: IPostProps[];
}

export const PostList: React.SFC<IPostListProps> = ({ posts }) => (
    <div>
        {_.map(posts, (p) => Post(p))}
    </div>
);
