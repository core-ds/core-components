import React from 'react';
import { SteppedProgressBar } from '@alfalab/core-components-stepped-progress-bar';
import { Wrapper } from './Wrapper';

const StepperProgressBarExample = () => {
    return (
        <Wrapper>
            <SteppedProgressBar
                step={5}
                maxStep={10}
                description='Описание'
                view={[
                    'positive',
                    'negative',
                    'attention',
                    'link',
                    'tertiary',
                    'secondary',
                    'primary',
                    'accent',
                ]}
            />
        </Wrapper>
    );
};

export default StepperProgressBarExample;
