import React from 'react';
import { ProgressBar } from '@alfalab/core-components-progress-bar';
import { Wrapper } from './Wrapper';

const ProgressBarExample = () => {
    return (
        <Wrapper>
            <ProgressBar value={40} />
        </Wrapper>
    );
};

export default ProgressBarExample;
