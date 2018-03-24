import { Meteor } from 'meteor/meteor';
import { Posts } from 'Lib/Posts';
import * as faker from 'faker';
import * as _ from 'lodash';
import 'Lib/api';

Meteor.startup(() => {
    Posts.clear();
    _.forEach(_.range(10), () => {
        Posts.insert(
            `${faker.hacker.ingverb()} ${faker.hacker.noun()}`, faker.lorem.paragraph(),
        );
    });
});
