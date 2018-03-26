import * as chai from 'chai';
import * as _ from 'lodash';
import { setPosts } from './actions';
import { postsReducer } from './reducer';
import { Posts } from 'Lib/Posts';

describe('postsReducer', function () {
    it('can set posts', function () {
        const numPosts = _.random(10);
        const posts = _.map(_.range(numPosts), Posts.randomPost);
        const action = setPosts(posts);
        const newState = postsReducer([], action);
        chai.expect(newState.length).to.equal(numPosts);
        _.forEach(newState, (p, i) => chai.expect(p).to.eql(posts[i]));
    });
});
