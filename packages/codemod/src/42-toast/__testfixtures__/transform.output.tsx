/* eslint-disable */
import React from 'react';

import { ToastDesktop, ToastDesktopProps } from '@alfalab/core-components/toast/desktop';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <ToastDesktop open={false} onClose={noop}/>
        </React.Fragment>
    );
};
