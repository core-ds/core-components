import React from 'react';
import { Spinner } from '@alfalab/core-components-spinner';
import { Wrapper } from './Wrapper';

const SpinnerExample = () => {
    return (
        <Wrapper>
            <Spinner visible={true} size='s' />
            <div style={{ height: 16 }} />
            <Spinner visible={true} size='m' />
        </Wrapper>
    );
};

export default SpinnerExample;
