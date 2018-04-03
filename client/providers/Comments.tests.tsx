// tslint:disable:only-arrow-functions
import * as chai from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as configureMockStore from 'redux-mock-store';

import { Providers } from './Comments';

enzyme.configure({ adapter: new Adapter() });

describe('Comments Providers', function () {

    const MockComponent = () => (<div></div>);
    const mockStore = configureMockStore();

    const { withCommentsByPostId } = Providers;
    const Wrapped = withCommentsByPostId(MockComponent);

    describe('withCommentsByPostId', function () {

        it('passes empty array when comments collection is empty', function () {

            const postId = '123';
            const store = mockStore({
                mongo: {
                    collections: {
                        comments: [],
                    },
                },
            });

            const mounted = enzyme.shallow(<Wrapped postId={postId} />, { context: { store } });

            const props = mounted.find(MockComponent).props();
            chai.expect(props.comments).to.be.an('array');
            chai.expect(props.comments.length).to.equal(0);
            chai.expect(props.postId).to.equal(postId);

        });

        it('passes correct comments when collection not empty', function () {

            const postId = '123';
            const store = mockStore({
                mongo: {
                    collections: {
                        comments: [{
                            postId,
                        }, {
                            postId: '456',
                        }],
                    },
                },
            });

            const mounted = enzyme.shallow(<Wrapped postId={postId} />, { context: { store } });

            const props = mounted.find(MockComponent).props();
            chai.expect(props.comments).to.be.an('array');
            chai.expect(props.comments.length).to.equal(1);
            chai.expect(props.comments[0].postId).to.equal(postId);
            chai.expect(props.postId).to.equal(postId);

        });
    });

});
