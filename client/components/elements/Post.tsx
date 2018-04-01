import * as React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Segment } from 'semantic-ui-react';

export interface IPostProps {
    _id: string;
    title: string;
    text: string;
    commentCount: number;
    created: Date;
}

export const Post: React.SFC<IPostProps> = ({ _id, title = '', text = '', commentCount = 0, created }) => (
    <Segment className='post' key={_id} stacked padded >
        <Header as={Link} to={`/post/${_id}`}>{title}</Header>
        <br />
        <br />
        <p>{text}</p>
        <Grid>
            <Grid.Column width={8}>
                <p>{commentCount} comments</p>
            </Grid.Column>
            <Grid.Column width={8} textAlign='right'>
                <p>{!!created ? created.toDateString() : ''}</p>
            </Grid.Column>
        </Grid>
    </Segment>
);
