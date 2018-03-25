import { Comments } from './Comments';
import { Posts } from './Posts';

Meteor.methods({
    'comments.insert': Comments.insert,
    'comments.get': Comments.get,
    'comments.remove': Comments.remove,
    'posts.insert': Posts.insert,
    'posts.get': Posts.get,
    'posts.remove': Posts.remove,
});
