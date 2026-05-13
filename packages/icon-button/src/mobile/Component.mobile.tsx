import React, { forwardRef } from 'react';

import { BaseIconButton } from '../components/base-icon-button/Component';
import { type IconButtonProps } from '../types/icon-button-props';

import clientStyles from './mobile.module.css';

export type IconButtonMobileProps = IconButtonProps;

export const IconButtonMobile = forwardRef<HTMLButtonElement, IconButtonMobileProps>(
    (props, ref) => (
        <BaseIconButton {...props} ref={ref} client='mobile' clientStyles={clientStyles} />
    ),
);

IconButtonMobile.displayName = 'IconButtonMobile';
