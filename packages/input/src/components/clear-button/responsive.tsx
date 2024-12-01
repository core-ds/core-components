import React from 'react';

import { Button } from '@alfalab/core-components-button';

import { type ClearButtonProps, ClearButtonBase } from './Component';

export const ClearButtonResponsive = (props: ClearButtonProps) => (
    <ClearButtonBase {...props} Button={Button} />
);
