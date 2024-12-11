import React, { forwardRef } from 'react';

import { Button } from '@alfalab/core-components-button';

import { BaseCustomButton } from './components/base-custom-button';
import { CustomButtonProps } from './types/props';

export const CustomButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, CustomButtonProps>(
    ({ children, ...restProps }, ref) => (
        <BaseCustomButton ref={ref} {...restProps} component={Button}>
            {children}
        </BaseCustomButton>
    ),
);

CustomButton.displayName = 'CustomButton';
