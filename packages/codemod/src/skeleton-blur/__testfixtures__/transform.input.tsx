import React from 'react';

import { Button } from '@alfalab/core-components-button';
import { Skeleton } from '@alfalab/core-components-skeleton';

export const Component = () => (
    <React.Fragment>
        <Button size='xs'>Button</Button>
        <Skeleton >Skeleton</Skeleton>
        <Skeleton visible={true}>Skeleton</Skeleton>
    </React.Fragment>
);
