import React, { forwardRef } from 'react';

import { Input } from '@alfalab/core-components-input';
import { useMatchMedia } from '@alfalab/core-components-mq';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';

import { NumberInput, NumberInputProps } from './components/number-input';

export type NumberInputResponsiveProps = Omit<NumberInputProps, 'Input' | 'view'>;

export const NumberInputResponsive = forwardRef<HTMLInputElement, NumberInputResponsiveProps>(
    ({ breakpoint = getComponentBreakpoint(), defaultMatchMediaValue, ...restProps }, ref) => {
        const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

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
