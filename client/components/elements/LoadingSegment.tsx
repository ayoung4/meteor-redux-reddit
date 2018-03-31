import * as React from 'react';
import { Dimmer, Image, Loader, Segment } from 'semantic-ui-react';

export const LoadingSegment: React.SFC<{}> = () => (
    <Segment>
        <Dimmer active inverted>
            <Loader content='Loading' />
        </Dimmer>
        <Image src='https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png' />
    </Segment>
);
