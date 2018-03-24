import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import * as faker from 'faker';
import * as _ from 'lodash';

export module Posts {

    const collection = new Mongo.Collection<IPost>('posts');

    export const randomPost: () => IPost = () => ({
        _id: Random.id(),
        title: `${faker.hacker.ingverb()} ${faker.hacker.noun()}`,
        text: faker.lorem.paragraph(),
        created: new Date(),
        upVotes: _.random(10),
    });

    export const insert = (title: string, text: string) => collection.insert({
        title,
        text,
        created: new Date(),
        upVotes: 0,
    });

    export const remove = (_id: string) => collection.remove(_id);

    export const clear = () => collection.remove({});

    export const get = (selector?: Mongo.Selector, modifier?: Mongo.Modifier) =>
        collection.find(selector || {}, modifier).fetch();

}
