import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { BaseUniversalDateInput } from './components/base-universal-date-input';
import type { UniversalDateInputProps } from './types';

export const UniversalDateInput = forwardRef<HTMLInputElement, UniversalDateInputProps>(
    ({ breakpoint = 1024, defaultMatchMediaValue, view, ...restProps }, ref) => {
        const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

        return (
            <BaseUniversalDateInput
                {...restProps}
                ref={ref}
                view={view}
                breakpoint={breakpoint}
                defaultMatchMediaValue={defaultMatchMediaValue}
                platform={isDesktop ? 'desktop' : 'mobile'}
            />
        );
    },
);

UniversalDateInput.displayName = 'UniversalDateInput';
