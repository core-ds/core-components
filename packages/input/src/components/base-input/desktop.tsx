import React, { forwardRef } from 'react';

import { ClearButtonDesktop } from '../clear-button';

import { type BaseInputProps, BaseInputComponent } from './Component';

export const BaseInputDesktop = forwardRef<HTMLInputElement, BaseInputProps>(
    (props: BaseInputProps, ref) => (
        <BaseInputComponent {...props} ClearButton={ClearButtonDesktop} ref={ref} />
    ),
);
