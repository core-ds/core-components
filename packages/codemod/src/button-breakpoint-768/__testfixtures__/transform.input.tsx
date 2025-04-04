import React from 'react';
import { Tooltip } from '@balafla/core-components/tooltip';
import { Button as CoreButton, ButtonProps } from '@balafla/core-components-button';
import { Button } from '@mui/material/Button';

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
