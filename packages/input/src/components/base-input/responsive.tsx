import React, { forwardRef } from 'react';

import { ClearButton } from '../clear-button';

import { type BaseInputProps, BaseInputComponent } from './Component';

export const BaseInputResponsive = forwardRef<HTMLInputElement, BaseInputProps>(
    (props: BaseInputProps, ref) => (
        <BaseInputComponent {...props} ClearButton={ClearButton} ref={ref} />
    ),
);
