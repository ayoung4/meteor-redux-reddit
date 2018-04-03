import * as React from 'react';

import { storiesOf } from '@storybook/react';

import { Avatar } from '../../client/components/elements/Avatar';

const avatarProps = {
    b: 130,
    g: 100,
    r: 200,
};

storiesOf('Avatar', module)
    .add('basic color', () => <Avatar {...avatarProps} />);
