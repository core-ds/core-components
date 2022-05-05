import React from 'react';
import { withSuffix } from '@alfalab/core-components-with-suffix';
import { Input } from '@alfalab/core-components-input';
import { Wrapper } from './Wrapper';

const SuffixInput = withSuffix(Input);

const WithSuffixExample = () => {
    return (
        <Wrapper>
            <SuffixInput suffix={<b> мес</b>} />
        </Wrapper>
    );
};

export default WithSuffixExample;
