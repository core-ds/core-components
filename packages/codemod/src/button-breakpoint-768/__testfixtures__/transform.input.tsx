import React from 'react';
import { Button } from '@mui/material/Button';

import { Tooltip } from '@alfalab/core-components/tooltip';
import { Button as CoreButton, ButtonProps } from '@alfalab/core-components-button';

export const Component = (p: ButtonProps) => (
    <React.Fragment>
        <Tooltip content='tooltip'>
            <CoreButton breakpoint={1024}>Button</CoreButton>
        </Tooltip>
        <CoreButton {...p} view='primary'>
            Button
        </CoreButton>
        <Button view='primary'>Button</Button>
    </React.Fragment>
);
