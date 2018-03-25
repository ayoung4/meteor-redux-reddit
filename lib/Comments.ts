import { Mongo } from 'meteor/mongo';
import * as faker from 'faker';
import * as _ from 'lodash';
export module Comments {

    const collection = new Mongo.Collection<IComment>('comments');

    export const randomComment: (postId?: string) => IComment = (postId) => ({
        _id: Random.id(),
        text: faker.lorem.paragraph(),
        created: new Date(),
        postId: postId || Random.id(),
    });

    export const insert = (postId: string, text: string) => collection.insert(({
        text,
        created: new Date(),
        postId,
    } as IComment));

    export const remove = (_id: string) => collection.remove(_id);

    export const clear = () => collection.remove({});

    export const get = (selector?: Mongo.Selector, modifier?: Mongo.Modifier) =>
        collection.find(selector || {}, modifier).fetch();

}
