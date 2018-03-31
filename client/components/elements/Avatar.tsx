import * as React from 'react';
import { Image } from 'semantic-ui-react';

export const Avatar: React.SFC<IColor> = ({ r, g, b }) => (
    <div className='avatar' style={{
        backgroundColor: `rgb(${r},${g},${b})`,
        borderRadius: '2em',
        height: '1.5em',
        width: '1.5em',
    }}></div>
);
