import * as React from 'react';

import { storiesOf } from '@storybook/react';

import { LoadingSegment } from '../../client/components/elements/LoadingSegment';

storiesOf('LoadingSegment', module)
    .add('basic loader', () => <LoadingSegment />);
