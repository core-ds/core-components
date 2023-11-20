import React, { forwardRef } from 'react';

import { BaseUniversalDateInput } from '../components/base-universal-date-input';
import type { UniversalDateInputDesktopProps } from '../types';

export const UniversalDateInputMobile = forwardRef<
    HTMLInputElement,
    UniversalDateInputDesktopProps
>((props, ref) => (
    <BaseUniversalDateInput
        {...props}
        ref={ref}
        breakpoint={10000}
        platform='mobile'
        defaultMatchMediaValue={false}
    />
));
