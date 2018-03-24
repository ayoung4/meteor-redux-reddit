import * as React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const Post: React.SFC<IPost> = ({ _id, title, text }) => (
    <Segment key={_id} stacked={true} >
        <Header as={Link} to={`/post/${_id}`}>{title}</Header>
        <p>{text}</p>
    </Segment>
);
