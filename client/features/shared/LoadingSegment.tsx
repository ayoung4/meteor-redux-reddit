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

type LoadingEnhancerFactory = <P>(isLoading: (props: P) => boolean) => ComponentEnhancer<P, P>;

export const withLoadingSegment: LoadingEnhancerFactory = (isLoading: (props) => boolean) => branch(
    isLoading,
    renderComponent(LoadingSegment),
);
