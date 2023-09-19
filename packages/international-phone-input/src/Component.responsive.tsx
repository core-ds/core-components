import React from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { InternationalPhoneInputDesktop } from './Component.desktop';
import { InternationalPhoneInputMobile } from './Component.mobile';
import { InternationalPhoneInputProps } from './types';

export const InternationalPhoneInput = React.forwardRef<
    HTMLInputElement,
    InternationalPhoneInputProps
>(({ breakpoint = 1024, defaultMatchMediaValue, ...restProps }, ref) => {
    const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

    return isDesktop ? (
        <InternationalPhoneInputDesktop {...restProps} ref={ref} />
    ) : (
        <InternationalPhoneInputMobile {...restProps} ref={ref} />
    );
});
