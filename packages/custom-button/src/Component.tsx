import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { BaseCustomButton } from './components/base-custom-button';
import { type CustomButtonProps } from './types/props';

import desktopStyles from './desktop/index.module.css';
import mobileStylse from './mobile/index.module.css';

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

        return (
            <BaseCustomButton
                {...restProps}
                ref={ref}
                styles={isDesktop ? desktopStyles : mobileStylse}
            >
                {children}
            </BaseCustomButton>
        );
    },
);

CustomButton.displayName = 'CustomButton';
