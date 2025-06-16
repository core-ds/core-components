import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { InputAutocompleteDesktop } from './desktop';
import { InputAutocompleteMobile } from './mobile';
import { InputAutocompleteProps } from './types';

export const InputAutocomplete = forwardRef<
    HTMLInputElement | HTMLTextAreaElement | HTMLDivElement,
    InputAutocompleteProps
>(
    (
        {
            breakpoint,
            client,
            defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
            mobileProps,
            ...restProps
        },
        ref,
    ) => {
        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

        return isDesktop ? (
            <InputAutocompleteDesktop {...restProps} ref={ref as React.Ref<HTMLInputElement>} />
        ) : (
            <InputAutocompleteMobile {...restProps} {...mobileProps} ref={ref} />
        );
    },
);

InputAutocomplete.displayName = 'InputAutocomplete';
