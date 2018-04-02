// tslint:disable:only-arrow-functions
import * as chai from 'chai';
import * as _ from 'lodash';
import { minimongoActionTypes } from './constants';
import { collectionReducer, initialState } from './reducer';

describe('Collection reducer', function () {

    it('sets initial state', function () {

        const result = collectionReducer(undefined, {});
        chai.expect(result).to.be.an('object');

        chai.expect(_.keys(result).length).to.equal(_.keys(initialState).length);

        _.forEach(_.keys(result), (k) => {
            chai.expect(result[k]).to.be.an('array');
            chai.expect(result[k].length).to.equal(0);
        });

    });

    describe(`reduces ${minimongoActionTypes.SET_MONGO_COLLECTION}`, function () {

        it('updates collection docs', function () {

            const collectionName: keyof ICollectionsState = 'posts';
            const docs = _.map(_.range(5), (i) => ({ _id: i }));
            const result = collectionReducer(initialState, {
                payload: {
                    docs,
                    name: collectionName,
                },
                type: minimongoActionTypes.SET_MONGO_COLLECTION,
            });

            _.forEach(_.keys(result), (k) => {
                if (k === collectionName) {
                    chai.expect(result[k]).to.be.an('array');
                    chai.expect(result[k].length).to.equal(docs.length);
                    _.forEach(result[k], (d, i) => {
                        chai.expect(d._id).to.equal(docs[i]._id);
                    });
                } else {
                    chai.expect(result[k]).to.be.an('array');
                    chai.expect(result[k].length).to.equal(0);
                }
            });

        });

    });

});
