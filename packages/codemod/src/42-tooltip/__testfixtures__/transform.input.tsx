/* eslint-disable */
import React from 'react';

import { Tooltip, TooltipProps } from '@balafla/core-components/tooltip';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <Tooltip content='content'><div/></Tooltip>
        </React.Fragment>
    );
};
