import { Posts } from './Posts';

Meteor.methods({
    'posts.insert': Posts.insert,
    'posts.get': Posts.get,
    'posts.remove': Posts.remove,
});
