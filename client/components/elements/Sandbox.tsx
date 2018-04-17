import * as React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export interface ISandboxProps {
    script: string;
    sandboxId?: string;
    height?: number;
    width?: number;
    ready: boolean;
}

const iframeInContext = (f) => this.iframe = f;

export const Sandbox: React.SFC<ISandboxProps> = ({
    script,
    sandboxId = 'sandbox',
    height = 300,
    width = 300,
    ready,
}) => (
        <div className='sandbox-wrapper' id={`wrapper-${sandboxId}`}>
            {!ready && (
                <Dimmer active inverted>
                    <Loader content='Loading' />
                </Dimmer>
            )}
            <iframe id={sandboxId}
                height={height}
                width={width}
                sandbox='allow-scripts allow-same-origin'
                src={script}
                ref={iframeInContext} />
        </div >
    );
