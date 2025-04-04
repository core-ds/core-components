import React, { forwardRef } from 'react';
import { useIsDesktop } from '@balafla/core-components-mq';

import { BaseUniversalDateInput } from './components/base-universal-date-input';
import type { UniversalDateInputProps } from './types';

export const UniversalDateInput = forwardRef<HTMLInputElement, UniversalDateInputProps>(
    (
        {
            breakpoint,
            client,
            defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
            view,
            ...restProps
        },
        ref,
    ) => {
        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

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
