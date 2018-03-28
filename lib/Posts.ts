import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';

import * as faker from 'faker';
import * as _ from 'lodash';

export module Posts {

    export const collection = new Mongo.Collection<IPost>('posts');

    export const randomPost: () => IPost = () => ({
        _id: Random.id(),
        created: new Date(),
        text: faker.lorem.paragraph(),
        title: `${faker.hacker.ingverb()} ${faker.hacker.noun()}`,
        upVotes: _.random(10),
    });

    export const insert = (title: string, text: string) => collection.insert(({
        created: new Date(),
        text,
        title,
        upVotes: 0,
    }) as IPost);

    export const remove = (_id: string) => collection.remove(_id);

    export const clear = () => collection.remove({});

    export const get = (selector?: Mongo.Selector, modifier?: Mongo.Modifier) =>
        collection.find(selector || {}, modifier).fetch();

}
