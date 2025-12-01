import React, { forwardRef } from 'react';

import { BaseIconButton } from '../components/base-icon-button/Component';
import { type IconButtonProps } from '../types/icon-button-props';

export type IconButtonDesktopProps = IconButtonProps;

export const IconButtonDesktop = forwardRef<HTMLButtonElement, IconButtonDesktopProps>(
    (props, ref) => <BaseIconButton {...props} ref={ref} client='desktop' />,
);

IconButtonDesktop.displayName = 'IconButtonDesktop';
