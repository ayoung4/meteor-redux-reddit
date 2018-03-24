import { Mongo } from 'meteor/mongo';

export const Comments = new Mongo.Collection<IComment>('comments');

export const insert = (text: string, postId: string) => Comments.insert({
    text,
    created: new Date(),
    postId,
});
