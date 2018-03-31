import * as _ from 'lodash';

export module Selectors {

    export const commentsByPostId = (state: IStoreState, postId: string) =>
        _.filter(state.mongo.collections.comments, (c) => c.postId === postId);

    export const postById = (state: IStoreState, _id: string) =>
        _.find(state.mongo.collections.posts, (p) => p._id === _id) || ({} as IPost);

    export const postsByIds = (state: IStoreState, postIds: string[]) =>
        _.filter(state.mongo.collections.posts, ({ _id }) =>
            _.includes(postIds, _id));

}
