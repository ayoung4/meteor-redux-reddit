import { Mongo } from 'meteor/mongo';

export enum minimongoActionTypes {
    SET_MONGO_COLLECTION_READY_STATE = 'MONGO_COLLECTION_READY_STATE',
    SET_MONGO_COLLECTION = 'SET_MONGO_COLLECTION',
}

export const setReady = (name, state) => {
    return (dispatch) => {
        dispatch({
            payload: {
                name,
                state,
            },
            type: minimongoActionTypes.SET_MONGO_COLLECTION_READY_STATE,
        });
    };
};

export const syncCollection = (collection: Mongo.Collection<any> & { _name: string }) => ({
    payload: {
        collectionName: collection._name,
        docs: collection.find().fetch(),
    },
    type: minimongoActionTypes.SET_MONGO_COLLECTION,
});
