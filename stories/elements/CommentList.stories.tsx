import * as faker from 'faker';
import * as _ from 'lodash';
import * as React from 'react';

import { storiesOf } from '@storybook/react';

import { CommentList, ICommentListProps } from '../../client/components/elements/CommentList';

const commentListWithoutCommentsArgs: ICommentListProps = {
    comments: [],
};

const commentListWithCommentsArgs: ICommentListProps = {
    comments: _.map(_.range(10), (i) => ({
        _id: String(i),
        created: new Date(),
        text: faker.lorem.sentence(),
    })),
};

storiesOf('CommentList', module)
    .add('with comments', () => <CommentList {...commentListWithoutCommentsArgs} />)
    .add('without comments', () => <CommentList {...commentListWithCommentsArgs} />);
