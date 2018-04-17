import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Comments } from './Comments';
import { Posts } from './Posts';

interface IPublicationArgs<T, A> {
    name: string;
    run: (args: A) => Mongo.Cursor<T>;
}

export class Publication<T, A> {
    public name: string;
    private run: (args: A) => Mongo.Cursor<T>;
    constructor({ name, run }: IPublicationArgs<T, A>) {
        this.name = name;
        this.run = run;
        if (Meteor.isServer) {
            Meteor.publish(this.name, this.run);
        }
    }
    public subscribe(args: A): Meteor.SubscriptionHandle {
        if (Meteor.isClient) {
            return Meteor.subscribe(this.name, args);
        } else {
            throw new Meteor.Error(this.name, 'Dont subscribe serverside');
        }
    }
}

export const LoggedInUser = new Publication<any, {}>({
    name: 'users.logged-in',
    run() {
        return Meteor.users.find({ _id: this.userId || '' });
    },
});

export const AllPosts = new Publication<IPost, {}>({
    name: 'posts.all',
    run() {
        return Posts.collection.find();
    },
});

export const PostsById = new Publication<IPost, { _id: string }>({
    name: 'posts.by-id',
    run({ _id }) {
        return Posts.collection.find({ _id });
    },
});

export const PostsByIds = new Publication<IPost, { postIds: string[] }>({
    name: 'posts.by-id',
    run({ postIds }) {
        return Posts.collection.find({ _id: { $in: postIds } });
    },
});
