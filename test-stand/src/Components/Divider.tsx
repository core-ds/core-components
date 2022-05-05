import React from 'react';
import { Divider } from '@alfalab/core-components-divider';
import { Wrapper } from './Wrapper';

const DividerExample = () => {
    return (
        <Wrapper>
            <div style={{ height: 24, margin: '8px 0', backgroundColor: '#eeeff1' }} />

            <Divider />

            <div style={{ height: 24, margin: '8px 0', backgroundColor: '#eeeff1' }} />
        </Wrapper>
    );
};

export default DividerExample;
