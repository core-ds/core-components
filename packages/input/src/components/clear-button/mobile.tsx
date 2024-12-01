import React from 'react';

import { ButtonMobile } from '@alfalab/core-components-button';

import { type ClearButtonProps, ClearButtonBase } from './Component';

export const ClearButtonMobile = (props: ClearButtonProps) => (
    <ClearButtonBase {...props} Button={ButtonMobile} />
);
