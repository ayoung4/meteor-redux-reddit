import * as React from 'react';
import { branch, ComponentEnhancer, renderComponent } from 'recompose';
import { Dimmer, Image, Loader, Segment } from 'semantic-ui-react';

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
