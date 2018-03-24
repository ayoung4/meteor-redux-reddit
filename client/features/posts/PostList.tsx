import * as React from 'react';
import { Post } from './Post';

export interface IPostListProps {
    posts: IPost[];
    getPosts: any;
}

export const PostList: React.SFC<IPostListProps> = ({ posts }) => (
    <div>
        {posts.map((p) => Post(p))}
    </div>
);
