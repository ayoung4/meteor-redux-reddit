import * as faker from 'faker';
import * as _ from 'lodash';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import 'Lib/api';
import { Comments } from 'Lib/Comments';
import { Posts } from 'Lib/Posts';

Meteor.startup(() => {

    Meteor.users.remove({});
    Accounts.createUser({ username: 'admin', password: 'password' });

    Meteor.publish('users.logged-in', function () {
        return Meteor.users.find({ _id: this.userId || '' });
    });

    Meteor.publish('posts.all', function () {
        return Posts.collection.find();
    });

    Meteor.publish('posts.by-id', function ({ _id }: { _id: string }) {
        return Posts.collection.find({ _id });
    });

    Meteor.publish('posts.by-ids', function ({ postIds }: { postIds: string[] }) {
        return Posts.collection.find({ _id: { $in: postIds } });
    });

    Meteor.publish('comments.by-post-id', function ({ postId = '' }: { postId: string }) {
        return Comments.collection.find({ postId });
    });

});
