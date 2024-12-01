import React, { forwardRef } from 'react';

import { ClearButtonMobile } from '../clear-button';

import { type BaseInputProps, BaseInputComponent } from './Component';

export const BaseInputMobile = forwardRef<HTMLInputElement, BaseInputProps>(
    (props: BaseInputProps, ref) => (
        <BaseInputComponent {...props} ClearButton={ClearButtonMobile} ref={ref} />
    ),
);
