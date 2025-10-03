import React, { forwardRef } from 'react';

import { ButtonDesktop } from '@alfalab/core-components-button/desktop';

import { BaseCustomButton } from '../components/base-custom-button';
import { type CustomButtonProps } from '../types/props';

export const CustomButtonDesktop = forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    CustomButtonProps
>(({ children, ...restProps }, ref) => (
    <BaseCustomButton ref={ref} {...restProps} componentButton={ButtonDesktop}>
        {children}
    </BaseCustomButton>
));

CustomButtonDesktop.displayName = 'CustomButtonDesktop';
