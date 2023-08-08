/* eslint-disable */
import React from 'react';

import { ModalResponsive, ModalResponsiveProps, ModalContext } from '@alfalab/core-components/modal';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <ModalResponsive open={false as ModalResponsiveProps['open']}>
                <ModalResponsive.Content></ModalResponsive.Content>
            </ModalResponsive>
        </React.Fragment>
    );
};
