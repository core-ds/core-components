import React from 'react';
import { Button } from '@balafla/core-components-button';
import { Skeleton } from '@balafla/core-components-skeleton';

export const Component = () => (
    <React.Fragment>
        <Button size='xs'>Button</Button>
        <Skeleton >Skeleton</Skeleton>
        <Skeleton visible={true}>Skeleton</Skeleton>
    </React.Fragment>
);
