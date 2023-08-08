/* eslint-disable */
import React from 'react';

import { SystemMessage } from '@alfalab/core-components/system-message/modern';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <SystemMessage>
                <SystemMessage.Title>Title</SystemMessage.Title>
            </SystemMessage>
        </React.Fragment>
    );
};
