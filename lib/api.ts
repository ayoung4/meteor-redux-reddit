import { Comments } from './Comments';
import { Posts } from './Posts';

Meteor.methods({
    'comments.get': Comments.get,
    'comments.insert': Comments.insert,
    'comments.remove': Comments.remove,
    'posts.get': Posts.get,
    'posts.insert': Posts.insert,
    'posts.remove': Posts.remove,
});
