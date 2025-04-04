/* eslint-disable */
import React from 'react';

import { ConfirmationDesktop, useConfirmation, DesktopConfirmationProps } from '@balafla/core-components/confirmation/desktop';
import { ConfirmationMedia, defaultTexts } from '@balafla/core-components/confirmation/shared';
import { Confirmation, ConfirmationProps } from '@balafla/core-components/confirmation';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <ConfirmationDesktop />
            <Confirmation screen='INITIAL' state='CONFIRMED' onChangeState={noop as ConfirmationProps['onChangeState']} />
        </React.Fragment>
    );
};
