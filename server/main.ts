import * as faker from 'faker';
import * as _ from 'lodash';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import 'Lib/api';
import 'Lib/publications';
import { Comments } from 'Lib/Comments';
import { Posts } from 'Lib/Posts';


Meteor.startup(() => {

    Meteor.users.remove({});
    Accounts.createUser({ username: 'admin', password: 'password' });

    Meteor.publish('comments.by-post-id', function ({ postId = '' }: { postId: string }) {
        return Comments.collection.find({ postId });
    });

});
