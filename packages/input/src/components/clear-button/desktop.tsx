import React from 'react';

import { ButtonDesktop } from '@alfalab/core-components-button';

import { type ClearButtonProps, ClearButtonBase } from './Component';

export const ClearButtonDesktop = (props: ClearButtonProps) => (
    <ClearButtonBase {...props} Button={ButtonDesktop} />
);
