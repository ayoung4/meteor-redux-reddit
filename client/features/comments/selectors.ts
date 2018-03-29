import { IStoreState } from 'Client/Store';
import * as _ from 'lodash';

export const commentsByPostId = (state: IStoreState, postId: string) =>
    _.filter(state.mongo.collections.comments, (c) => c.postId === postId);
