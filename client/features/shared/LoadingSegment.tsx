import * as React from 'react';
import {Segment, Dimmer, Loader, Image} from 'semantic-ui-react';

export const LoadingSegment = () => (
    <Segment>
        <Dimmer active inverted>
            <Loader content='Loading' />
        </Dimmer>
        <Image src='https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png' />
    </Segment>
);
