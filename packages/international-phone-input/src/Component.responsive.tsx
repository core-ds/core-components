import React from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { InternationalPhoneInputDesktop } from './desktop';
import { InternationalPhoneInputMobile } from './mobile';
import { InternationalPhoneInputProps } from './types';

export const InternationalPhoneInput = React.forwardRef<
    HTMLInputElement,
    Omit<InternationalPhoneInputProps, 'size'> & {
        size: Exclude<InternationalPhoneInputProps['size'], 40>;
    }
>(
    (
        {
            breakpoint,
            client,
            defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
            ...restProps
        },
        ref,
    ) => {
        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

        return isDesktop ? (
            <InternationalPhoneInputDesktop {...restProps} ref={ref} />
        ) : (
            <InternationalPhoneInputMobile {...restProps} ref={ref} />
        );
    },
);

InternationalPhoneInput.displayName = 'InternationalPhoneInput';
