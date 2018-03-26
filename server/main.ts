import * as faker from 'faker';
import * as _ from 'lodash';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import 'Lib/api';
import { Comments } from 'Lib/Comments';
import { Posts } from 'Lib/Posts';

Meteor.startup(() => {
    Posts.clear();
    Comments.clear();
    Meteor.users.remove({});
    Accounts.createUser({ username: 'admin', password: 'password' });
    _.forEach(_.range(10), () => {
        const postId = Posts.insert(
            `${faker.hacker.ingverb()} ${faker.hacker.noun()}`, faker.lorem.paragraph(),
        );
        _.forEach(_.range(_.random(10)), () => {
            Comments.insert(
                postId,
                faker.lorem.paragraph(),
            );
        });
    });
});
