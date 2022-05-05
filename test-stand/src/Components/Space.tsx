import React from 'react';
import { CardImage } from '@alfalab/core-components-card-image';
import { Space } from '@alfalab/core-components-space';
import { Wrapper } from './Wrapper';

const SpaceExample = () => {
    return (
        <Wrapper>
            <Space direction='horizontal' size={32}>
                <CardImage cardId='EG' />
                <CardImage cardId='GQ' />
                <CardImage cardId='SU' />
            </Space>
        </Wrapper>
    );
};

export default SpaceExample;
