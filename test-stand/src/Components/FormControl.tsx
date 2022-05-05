import React from 'react';
import { FormControl } from '@alfalab/core-components-form-control';
import { Wrapper } from './Wrapper';

const FormControlExample = () => {
    return (
        <Wrapper>
            <div style={{ width: 240 }}>
                <FormControl block={true} label='Label' hint='Hint' />
            </div>
        </Wrapper>
    );
};

export default FormControlExample;
