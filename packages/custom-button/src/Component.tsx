import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { type CustomButtonProps } from './types/props';
import { CustomButtonDesktop } from './desktop';
import { CustomButtonMobile } from './mobile';

export const CustomButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, CustomButtonProps>(
    (
        {
            children,
            breakpoint,
            client,
            defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
            ...restProps
        },
        ref,
    ) => {
        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

        const Component = isDesktop ? CustomButtonDesktop : CustomButtonMobile;

        return (
            <Component ref={ref} {...restProps}>
                {children}
            </Component>
        );
    },
);

CustomButton.displayName = 'CustomButton';
