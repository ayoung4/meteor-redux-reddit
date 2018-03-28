import { IStoreState } from 'Client/Store';
import * as _ from 'lodash';

export const postById = (state: IStoreState, _id: string) =>
    _.find(state.mongo.collections.posts, (p) => p._id === _id) || ({} as IPost);
