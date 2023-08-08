/* eslint-disable */
import React from 'react';

import { Confirmation, useConfirmation, ConfirmationProps, ConfirmationMedia, defaultTexts } from '@alfalab/core-components/confirmation';
import { ConfirmationResponsive, ResponsiveConfirmationProps } from '@alfalab/core-components/confirmation/responsive';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <Confirmation />
            <ConfirmationResponsive screen='INITIAL' state='CONFIRMED' onChangeState={noop as ResponsiveConfirmationProps['onChangeState']} />
        </React.Fragment>
    );
};
