// tslint:disable:only-arrow-functions
import * as chai from 'chai';
import * as _ from 'lodash';
// import { Mongo } from 'meteor/mongo';
import { syncCollection } from './actions';
import { minimongoActionTypes } from './constants';

describe('Collection actions', function () {

    describe(`${minimongoActionTypes.SET_MONGO_COLLECTION}`, function () {

        it.skip('builds correctly', function () {

            interface ITestDoc { data: number; }

            const colletionName = 'test-collection';
            const collection = new Mongo.Collection<ITestDoc>(colletionName);

            const insertedDocs = _.map(_.range(5), () => ({ data: _.random(10) }));
            
            _.forEach(insertedDocs, (doc) => collection.insert(doc));
            
            const action = syncCollection(collection);

            chai.expect(action).to.be.an('object');
            chai.expect(action.type).to.equal(minimongoActionTypes.SET_MONGO_COLLECTION);
            chai.expect(action.payload.name).to.equal(colletionName);

            chai.expect(action.payload.docs).to.be.an('array');
            
            _.forEach(action.payload.docs, (doc, i) => {
                chai.expect(doc.data).to.equal(insertedDocs[i].data);
            });

        });

    });

});