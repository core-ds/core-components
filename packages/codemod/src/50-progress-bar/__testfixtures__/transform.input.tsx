import React, {Fragment} from 'react';

import { ProgressBar } from '@alfalab/core-components-progress-bar';

export const Component = () => (
    <Fragment>
        <ProgressBar size='s' value={20}/>
        <ProgressBar size='m' value={20}/>
        <ProgressBar size={'s'} value={20}/>
        <ProgressBar size={'m'} value={20}/>
    </Fragment>
);
