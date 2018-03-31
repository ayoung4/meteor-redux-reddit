import * as React from 'react';
import { Link } from 'react-router-dom';
import { Header, Image, Segment } from 'semantic-ui-react';

export const NoPostsSegment: React.SFC<{}> = () => (
    <Segment textAlign='center'>
        <Header>There Are No Posts To Display!</Header>
        <Link to='/add/post'>Make One</Link>
    </Segment>
);
