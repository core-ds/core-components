/* eslint-disable */
import React from 'react';

import { TooltipDesktop, TooltipDesktopProps } from '@balafla/core-components/tooltip/desktop';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <TooltipDesktop content='content'><div/></TooltipDesktop>
        </React.Fragment>
    );
};
