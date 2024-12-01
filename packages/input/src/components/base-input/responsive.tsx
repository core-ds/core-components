import React from 'react';

import { ClearButton } from '../clear-button';

import { type BaseInputProps, BaseInputComponent } from './Component';

export const BaseInputResponsive = (props: BaseInputProps) => (
    <BaseInputComponent {...props} ClearButton={ClearButton} />
);
