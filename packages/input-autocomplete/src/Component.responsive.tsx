import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { InputAutocompleteDesktop } from './desktop';
import { InputAutocompleteMobile } from './mobile';
import { InputAutocompleteProps } from './types';

export const InputAutocomplete = forwardRef<
    HTMLInputElement | HTMLDivElement,
    InputAutocompleteProps
>(({ breakpoint = 1024, defaultMatchMediaValue = true, mobileProps, ...restProps }, ref) => {
    const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

    return isDesktop ? (
        <InputAutocompleteDesktop {...restProps} ref={ref as React.Ref<HTMLInputElement>} />
    ) : (
        <InputAutocompleteMobile {...restProps} {...mobileProps} ref={ref} />
    );
});

InputAutocomplete.displayName = 'InputAutocomplete';
