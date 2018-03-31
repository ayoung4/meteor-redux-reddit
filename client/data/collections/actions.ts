import {minimongoActionTypes} from './constants';

export const syncCollection = (collection: Mongo.Collection<any> & { _name: string }) => ({
    payload: {
        docs: collection.find().fetch(),
        name: collection._name,
    },
    type: minimongoActionTypes.SET_MONGO_COLLECTION,
});
