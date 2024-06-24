import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';

import { BaseUniversalDateInput } from './components/base-universal-date-input';
import type { UniversalDateInputProps } from './types';

export const UniversalDateInput = forwardRef<HTMLInputElement, UniversalDateInputProps>(
    (
        { breakpoint = getComponentBreakpoint(), defaultMatchMediaValue, view, ...restProps },
        ref,
    ) => {
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
