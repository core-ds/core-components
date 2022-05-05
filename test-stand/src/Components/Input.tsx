import React from 'react';
import { Input } from '@alfalab/core-components-input';
import { Wrapper } from './Wrapper';

const InputExample = () => {
    return (
        <Wrapper>
            <Input label='email' name='email' />
            <br />
            <Input label='phone' name='phone' />
        </Wrapper>
    );
};

export default InputExample;
