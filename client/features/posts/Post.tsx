import * as React from 'react';
import { Header, Segment, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export interface IPostProps {
    _id: string;
    title: string;
    text: string;
    commentCount: number;
    created: Date;
    getPostById: any;
}

export const Post: React.SFC<IPostProps> = ({ _id, title, text, commentCount, created }) => (
    <Segment key={_id} stacked padded >
        <Header as={Link} to={`/post/${_id}`}>{title}</Header>
        <br/>
        <br/>
        <p>{text}</p>
        <Grid>
            <Grid.Column width={8}>
                <p>{commentCount} comments</p>
            </Grid.Column>
            <Grid.Column width={8} textAlign='right'>
                <p>{created.toDateString()}</p>            
            </Grid.Column>
        </Grid>
    </Segment>
);
