import React, { forwardRef } from 'react';

import { Input } from '@alfalab/core-components-input';
import { useIsDesktop } from '@alfalab/core-components-mq';

import { NumberInput, NumberInputProps } from './components/number-input';

export type NumberInputResponsiveProps = Omit<NumberInputProps, 'Input' | 'view'>;

export const NumberInputResponsive = forwardRef<HTMLInputElement, NumberInputResponsiveProps>(
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

        return (
            <NumberInput
                {...restProps}
                Input={Input}
                ref={ref}
                view={isDesktop ? 'desktop' : 'mobile'}
                breakpoint={breakpoint}
                defaultMatchMediaValue={defaultMatchMediaValue}
            />
        );
    },
);

NumberInputResponsive.displayName = 'NumberInputResponsive';
