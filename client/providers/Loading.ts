import { LoadingSegment } from 'Components/elements/LoadingSegment';
import { branch, ComponentEnhancer, renderComponent } from 'recompose';

export module Providers {

    type LoadingEnhancerFactory = <P>(isLoading: (props: P) => boolean)
        => ComponentEnhancer<P, P>;

    export const withLoadingSegment: LoadingEnhancerFactory
        = (isLoading: (props) => boolean) => branch(
            isLoading,
            renderComponent(LoadingSegment),
        );

}
