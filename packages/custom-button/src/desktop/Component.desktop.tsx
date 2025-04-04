import React, { forwardRef } from 'react';
import { ButtonDesktop } from '@balafla/core-components-button/desktop';

import { BaseCustomButton } from '../components/base-custom-button';
import { CustomButtonProps } from '../types/props';

export const CustomButtonDesktop = forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    CustomButtonProps
>(({ children, ...restProps }, ref) => (
    <BaseCustomButton ref={ref} {...restProps} componentButton={ButtonDesktop}>
        {children}
    </BaseCustomButton>
));

CustomButtonDesktop.displayName = 'CustomButtonDesktop';
