import React, { forwardRef } from 'react';

import { BaseUniversalDateInput } from '../components/base-universal-date-input';
import type { UniversalDateInputMobileProps } from '../types';

export const UniversalDateInputMobile = forwardRef<HTMLInputElement, UniversalDateInputMobileProps>(
    (props, ref) => (
        <BaseUniversalDateInput
            {...props}
            ref={ref}
            breakpoint={10000}
            platform='mobile'
            defaultMatchMediaValue={false}
        />
    ),
);
