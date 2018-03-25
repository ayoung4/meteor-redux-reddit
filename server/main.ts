import { Meteor } from 'meteor/meteor';
import { Comments } from 'Lib/Comments';
import { Posts } from 'Lib/Posts';
import * as faker from 'faker';
import * as _ from 'lodash';
import 'Lib/api';

Meteor.startup(() => {
    Posts.clear();
    Comments.clear();
    _.forEach(_.range(10), () => {
        const postId = Posts.insert(
            `${faker.hacker.ingverb()} ${faker.hacker.noun()}`, faker.lorem.paragraph(),
        );
        _.forEach(_.range(_.random(10)), () => {
            Comments.insert(
                postId,
                faker.lorem.paragraph(),
            );
        })
    });
});
