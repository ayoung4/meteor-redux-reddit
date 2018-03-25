import * as React from 'react';
import { Segment, Dimmer, Loader, Image } from 'semantic-ui-react';
import { branch, renderComponent, ComponentEnhancer } from 'recompose';

export const LoadingSegment = () => (
    <Segment>
        <Dimmer active inverted>
            <Loader content='Loading' />
        </Dimmer>
        <Image src='https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png' />
    </Segment>
);

export const withLoadingSegment = (isLoading: (props) => boolean) => branch(
    isLoading,
    renderComponent(LoadingSegment),
);