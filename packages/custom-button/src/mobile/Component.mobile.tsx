import React, { forwardRef } from 'react';

import { ButtonMobile } from '@alfalab/core-components-button/mobile';

import { BaseCustomButton } from '../components/base-custom-button';
import { CustomButtonProps } from '../types/props';

export const CustomButtonMobile = forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    CustomButtonProps
>(({ children, ...restProps }, ref) => (
    <BaseCustomButton ref={ref} {...restProps} component={ButtonMobile}>
        {children}
    </BaseCustomButton>
));

CustomButtonMobile.displayName = 'CustomButtonMobile';
