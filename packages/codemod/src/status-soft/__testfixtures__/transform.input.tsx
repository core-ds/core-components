import React from 'react';
import { Status } from '@balafla/core-components-status';

export const Component = () => (
    <React.Fragment>
        <Status view='contrast'>Label</Status>
        <Status view='soft'>Label</Status>
        <Status view='muted'>Label</Status>
        <Status view='muted-alt'>Label</Status>
        <Status view='soft' color='green'>Label</Status>
        <Status color='green'>Label</Status>
        <Status>Label</Status>
    </React.Fragment>
);
