import React from 'react';
import { HatchingProgressBar } from '@alfalab/core-components-hatching-progress-bar';
import { Wrapper } from './Wrapper';

const HatchingProgressBarExample = () => {
    return (
        <Wrapper>
            <HatchingProgressBar value={40} hatchValue={60} />
        </Wrapper>
    );
};

export default HatchingProgressBarExample;
