import React, { forwardRef } from 'react';
import {
    IconButton as CoreIconButton,
    IconButtonProps as CoreIconButtonProps,
} from '@alfalab/core-components-icon-button';

export interface IconButtonProps extends Omit<CoreIconButtonProps, 'size'> {
    size?: 'xxs' | 'xs' | 's' | 24 | 32 | 40 | 48 | 56;
}

const sizeMap = {
    xxs: 24,
    xs: 32,
    s: 48,
} as const;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ size: sizeFromProps = 48, children, ...restProps }, ref) => {
        const size = typeof sizeFromProps === 'string' ? sizeMap[sizeFromProps] : sizeFromProps;
        return (
            <CoreIconButton {...restProps} ref={ref} size={size}>
                {children}
            </CoreIconButton>
        );
    },
);
