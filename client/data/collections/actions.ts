import { minimongoActionTypes } from './constants';

export const syncCollection = <T = any>(collection: Mongo.Collection<T>) => ({
    payload: {
        docs: collection.find().fetch(),
        name: (collection as Mongo.Collection<T> & { _name: string })._name,
    },
    type: minimongoActionTypes.SET_MONGO_COLLECTION,
});
