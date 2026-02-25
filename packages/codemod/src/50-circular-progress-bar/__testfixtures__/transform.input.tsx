import React, {Fragment} from 'react';

import { CircularProgressBar } from '@alfalab/core-components-circular-progress-bar';

export const Component = () => (
    <Fragment>
        <CircularProgressBar size='xs' />
        <CircularProgressBar size={'xs'} />

        <CircularProgressBar size='s' />
        <CircularProgressBar size={'s'} />

        <CircularProgressBar size='m' />
        <CircularProgressBar size={'m'} />

        <CircularProgressBar size='l' />
        <CircularProgressBar size={'l'} />

        <CircularProgressBar size='xl' />
        <CircularProgressBar size={'xl'} />

        <CircularProgressBar size='xxl' />
        <CircularProgressBar size={'xxl'} />
    </Fragment>
);
