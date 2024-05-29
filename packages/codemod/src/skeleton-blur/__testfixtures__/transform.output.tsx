import React from 'react';

import { Button } from '@alfalab/core-components-button';
import { Skeleton } from '@alfalab/core-components-skeleton';

export const Component = () => (
    <React.Fragment>
        <Button size='xs'>Button</Button>
        <Skeleton allowBackdropBlur={true}>Skeleton</Skeleton>
        <Skeleton visible={true} allowBackdropBlur={true}>Skeleton</Skeleton>
    </React.Fragment>
);
