import * as faker from 'faker';
import * as _ from 'lodash';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';

import { IPostProps, Post } from '../../client/components/elements/Post';

const props: IPostProps = {
    _id: '',
    commentCount: _.random(100),
    created: new Date(),
    text: faker.lorem.sentences(4),
    title: faker.lorem.sentence(),
};

storiesOf('Post', module)
    .addDecorator((story) => <MemoryRouter>{story()}</MemoryRouter>)
    .add('basic post', () => <Post {...props} />);
