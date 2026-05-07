import React, { forwardRef } from 'react';

import { BaseUniversalDateInput } from '../components/base-universal-date-input';
import { type UniversalDateInputDesktopProps } from '../types';

/**
 * @splitComponent desktop
 */
export const UniversalDateInputDesktop = forwardRef<
    HTMLInputElement,
    UniversalDateInputDesktopProps
>((props, ref) => (
    <BaseUniversalDateInput
        {...props}
        ref={ref}
        breakpoint={1}
        platform='desktop'
        defaultMatchMediaValue={true}
    />
));
