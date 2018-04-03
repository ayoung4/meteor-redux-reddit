import { routerActionTypes } from './constants';

export const transition = ({ pathname }: { pathname: string }) => ({
    meta: {
        transition: () => ({
            pathname,
        }),
    },
    type: routerActionTypes.TRANSITION,
});
