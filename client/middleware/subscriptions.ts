import { setSubscriptionReady } from 'Data/subscriptions/actions';
import { subscriptionActionTypes } from 'Data/subscriptions/constants';

export const subscriptions = ({ dispatch, getState }) => (next) => (action) => {
    if (action.type === subscriptionActionTypes.STOP_SUBSCRIPTION) {
        const { publication } = action.payload;
        const state: IStoreState = getState();
        state.mongo.subscriptions[publication.name].computation.stop();
        state.mongo.subscriptions[publication.name].handle.stop();
    }
    next(action);
};
