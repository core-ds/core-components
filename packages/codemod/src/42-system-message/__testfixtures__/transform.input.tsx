/* eslint-disable */
import React from 'react';

import { SystemMessageResponsive } from '@alfalab/core-components/system-message/modern/responsive';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <SystemMessageResponsive>
                <SystemMessageResponsive.Title>Title</SystemMessageResponsive.Title>
            </SystemMessageResponsive>
        </React.Fragment>
    );
};
