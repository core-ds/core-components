import React, {Fragment} from 'react';

import { ProgressBar } from '@alfalab/core-components-progress-bar';

export const Component = () => (
    <Fragment>
        <ProgressBar size={4} value={20}/>
        <ProgressBar size={8} value={20}/>
        <ProgressBar size={4} value={20}/>
        <ProgressBar size={8} value={20}/>
    </Fragment>
);
