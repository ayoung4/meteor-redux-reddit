import * as chai from 'chai';
import * as faker from 'faker';
import * as _ from 'lodash';
import { syncCollection } from './actions';
import { mongoReducer } from './reducers';

// tslint:disable:only-arrow-functions

interface ITestDocument {
    data: string;
}

describe('mongo reducer', function () {

    it('reduces sync collection action', function () {
        
        const numDocs = _.random(10);
        
        const collectionName = 'col';
        
        const collection = new Mongo.Collection<ITestDocument>(collectionName);
        
        _.forEach(_.range(numDocs), () =>
            collection.insert({ data: faker.hacker.adjective() }));
        
        const action = syncCollection(collection as any);
        const newState = mongoReducer({}, action);
        
        const storedCollections = _.keys(newState);
        chai.expect(storedCollections.length).to.equal(0);
        chai.expect(storedCollections[0]).to.equal(collectionName);
    
        const allDocuments = collection.find({}).fetch();

        _.forEach(newState[collectionName], (p, i) => chai.expect(p).to.eql(allDocuments[i]));
    
    });

});
